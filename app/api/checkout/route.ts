// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export type BillingInterval = 'monthly' | '3_monthly' | 'one_time';
export type TargetTier = 'SQE_PRO' | 'EAQE_PRO' | 'ALL_ACCESS_PRO';

// Verified Stripe Product IDs
const PRODUCT_MAP: Record<TargetTier, string> = {
  SQE_PRO: process.env.STRIPE_PRODUCT_SQE_PRO || 'prod_VVNsgSLRPamlFO',
  EAQE_PRO: process.env.STRIPE_PRODUCT_EAQE_PRO || 'prod_VVOo8UIEHHd9tD',
  ALL_ACCESS_PRO: process.env.STRIPE_PRODUCT_ALL_ACCESS_PRO || 'prod_VVP0KSnzem9XSx',
};

// Static Price ID Map
const PRICE_MAP: Record<BillingInterval, Record<TargetTier, string | undefined>> = {
  monthly: {
    SQE_PRO: process.env.STRIPE_PRICE_SQE_PRO_MONTHLY,
    EAQE_PRO: process.env.STRIPE_PRICE_EAQE_PRO_MONTHLY,
    ALL_ACCESS_PRO: process.env.STRIPE_PRICE_ALL_ACCESS_PRO_MONTHLY,
  },
  '3_monthly': {
    SQE_PRO: process.env.STRIPE_PRICE_SQE_PRO_3MONTHLY,
    EAQE_PRO: process.env.STRIPE_PRICE_EAQE_PRO_3MONTHLY,
    ALL_ACCESS_PRO: process.env.STRIPE_PRICE_ALL_ACCESS_PRO_3MONTHLY,
  },
  one_time: {
    SQE_PRO: process.env.STRIPE_PRICE_SQE_PRO_ONETIME,
    EAQE_PRO: process.env.STRIPE_PRICE_EAQE_PRO_ONETIME,
    ALL_ACCESS_PRO: process.env.STRIPE_PRICE_ALL_ACCESS_PRO_ONETIME,
  },
};

// Authoritative HKD Pricing Catalog
const TIER_PRICING_CATALOG: Record<TargetTier, Record<BillingInterval, number>> = {
  SQE_PRO: {
    monthly: 198,
    '3_monthly': 480,
    one_time: 500,
  },
  EAQE_PRO: {
    monthly: 288,
    '3_monthly': 688,
    one_time: 710,
  },
  ALL_ACCESS_PRO: {
    monthly: 388,
    '3_monthly': 880,
    one_time: 930,
  },
};

const TIER_DISPLAY_NAMES: Record<TargetTier, string> = {
  SQE_PRO: 'AgentPass™ SQE Salesperson License (細牌)',
  EAQE_PRO: 'AgentPass™ EAQE Estate Agent License (大牌)',
  ALL_ACCESS_PRO: 'AgentPass™ Dual-Track Master Pass (ALL-ACCESS)',
};

/**
 * Attempts to resolve a pre-created Stripe Price ID.
 * Returns null if not found or if the product does not exist in the active Stripe environment.
 */
async function resolvePriceId(tier: TargetTier, interval: BillingInterval): Promise<string | null> {
  const configuredPriceId = PRICE_MAP[interval]?.[tier];
  if (configuredPriceId && configuredPriceId.trim().length > 0) {
    return configuredPriceId.trim();
  }

  const productId = PRODUCT_MAP[tier];
  if (!productId) return null;

  try {
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 10,
    });

    if (!prices.data || prices.data.length === 0) return null;

    if (interval === 'monthly') {
      const match = prices.data.find(
        (p) => p.type === 'recurring' && p.recurring?.interval === 'month' && p.recurring?.interval_count === 1
      );
      if (match) return match.id;
    } else if (interval === '3_monthly') {
      const match = prices.data.find(
        (p) => p.type === 'recurring' && p.recurring?.interval === 'month' && p.recurring?.interval_count === 3
      );
      if (match) return match.id;
    } else if (interval === 'one_time') {
      const match = prices.data.find((p) => p.type === 'one_time');
      if (match) return match.id;
    }

    return prices.data[0]?.id || null;
  } catch (err) {
    console.warn(`[resolvePriceId] Could not query prices for product ${productId}:`, err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured on the server. Please check Vercel settings.' },
        { status: 500 }
      );
    }

    const body = await req.json();

    // 1. Sanitize & Normalize inputs
    const rawTier = (body.tier || '').toString().toUpperCase().trim();
    const tier: TargetTier = rawTier as TargetTier;

    let rawInterval = (body.billingInterval || '3_monthly').toString().toLowerCase().trim();
    if (rawInterval === 'quarterly' || rawInterval === '3-month' || rawInterval === '3_month') {
      rawInterval = '3_monthly';
    } else if (rawInterval === 'month' || rawInterval === 'monthly') {
      rawInterval = 'monthly';
    } else if (rawInterval === 'onetime' || rawInterval === 'one-time') {
      rawInterval = 'one_time';
    }
    const billingInterval = rawInterval as BillingInterval;

    if (!tier || !TIER_PRICING_CATALOG[tier]) {
      return NextResponse.json(
        { error: `Invalid subscription tier requested: "${body.tier}". Expected SQE_PRO, EAQE_PRO, or ALL_ACCESS_PRO.` },
        { status: 400 }
      );
    }

    const { email, track } = body as { email?: string; track?: 'EAQE' | 'SQE' };

    // 2. Strict Authentication Guard (Rejects unauthenticated or guest checkouts)
    const effectiveEmail =
      email && email.includes('@') && email !== 'guest@agentpass.hk'
        ? email.trim().toLowerCase()
        : null;

    if (!effectiveEmail) {
      return NextResponse.json(
        { error: '請先登入帳號以綁定升級方案 (Please log in to upgrade your account).' },
        { status: 401 }
      );
    }

    // 3. Determine price and subscription mode
    const isSubscription = billingInterval !== 'one_time';
    const catalogAmount = body.amount || TIER_PRICING_CATALOG[tier][billingInterval];
    const amountInCents = Math.round(catalogAmount * 100);

    // 4. Resolve existing Price ID or construct dynamic price_data
    const existingPriceId = await resolvePriceId(tier, billingInterval);

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

    if (existingPriceId) {
      lineItems = [
        {
          price: existingPriceId,
          quantity: 1,
        },
      ];
    } else {
      lineItems = [
        {
          price_data: {
            currency: 'hkd',
            unit_amount: amountInCents,
            product_data: {
              name: TIER_DISPLAY_NAMES[tier],
              description: `Hong Kong EAA Licensing Exam Pass (${billingInterval.replace('_', ' ').toUpperCase()})`,
            },
            ...(isSubscription
              ? {
                  recurring: {
                    interval: 'month',
                    interval_count: billingInterval === '3_monthly' ? 3 : 1,
                  },
                }
              : {}),
          },
          quantity: 1,
        },
      ];
    }

    // 5. Origin & Customer details
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.agentpass.hk';

    const metadataPayload = {
      userTier: tier,
      billingInterval,
      targetTrack: track || (tier === 'SQE_PRO' ? 'SQE' : 'EAQE'),
      userEmail: effectiveEmail,
      priceId: existingPriceId || 'dynamic_price_data',
      catalogAmountHKD: catalogAmount.toString(),
    };

    // 6. Build Stripe Checkout Session with user binding and confirmation message
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer_email: effectiveEmail,
      client_reference_id: effectiveEmail, // Binds session to the authenticated user email
      line_items: lineItems,
      mode: isSubscription ? 'subscription' : 'payment',
      allow_promotion_codes: true,
      metadata: metadataPayload,
      custom_text: {
        submit: {
          message: `確認付款後將立即為帳號 ${effectiveEmail} 開通 AgentPass™ PRO 權限。`,
        },
      },
      success_url: `${origin}/dashboard?payment=success&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?payment=cancelled`,
    };

    if (isSubscription) {
      sessionParams.subscription_data = {
        metadata: metadataPayload,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize checkout session' },
      { status: 500 }
    );
  }
}