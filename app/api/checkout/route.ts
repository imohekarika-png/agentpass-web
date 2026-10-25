// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

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

/**
 * Resolves the Stripe Price ID via explicit env var or dynamic lookup from product prices.
 */
async function resolvePriceId(tier: TargetTier, interval: BillingInterval): Promise<string> {
  const configuredPriceId = PRICE_MAP[interval]?.[tier];
  if (configuredPriceId && configuredPriceId.trim().length > 0) {
    return configuredPriceId.trim();
  }

  const productId = PRODUCT_MAP[tier];
  if (!productId) {
    throw new Error(`No product configured for tier: ${tier}`);
  }

  // Fetch active prices under the product
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 10,
  });

  if (!prices.data || prices.data.length === 0) {
    throw new Error(`No active Stripe prices found for product ${productId}`);
  }

  if (interval === 'monthly') {
    const monthlyPrice = prices.data.find(
      (p) => p.type === 'recurring' && p.recurring?.interval === 'month' && p.recurring?.interval_count === 1
    );
    if (monthlyPrice) return monthlyPrice.id;
  } else if (interval === '3_monthly') {
    const threeMonthPrice = prices.data.find(
      (p) => p.type === 'recurring' && p.recurring?.interval === 'month' && p.recurring?.interval_count === 3
    );
    if (threeMonthPrice) return threeMonthPrice.id;
  } else if (interval === 'one_time') {
    const oneTimePrice = prices.data.find((p) => p.type === 'one_time');
    if (oneTimePrice) return oneTimePrice.id;
  }

  return prices.data[0].id;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tier,
      billingInterval = '3_monthly',
      email,
      track,
    } = body as {
      tier: TargetTier;
      billingInterval?: BillingInterval;
      email?: string;
      track?: 'EAQE' | 'SQE';
    };

    if (!tier || !PRODUCT_MAP[tier]) {
      return NextResponse.json(
        { error: `Invalid subscription tier requested: ${tier}` },
        { status: 400 }
      );
    }

    const priceId = await resolvePriceId(tier, billingInterval);
    const stripePrice = await stripe.prices.retrieve(priceId);
    const isSubscription = stripePrice.type === 'recurring';

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://agentpass.hk';
    const effectiveEmail = email && email.includes('@') ? email.trim().toLowerCase() : undefined;

    const metadataPayload = {
      userTier: tier,
      billingInterval,
      targetTrack: track || (tier === 'SQE_PRO' ? 'SQE' : 'EAQE'),
      userEmail: effectiveEmail || 'guest@agentpass.hk',
      priceId,
    };

    const sessionParams: any = {
      payment_method_types: ['card'],
      customer_email: effectiveEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isSubscription ? 'subscription' : 'payment',
      allow_promotion_codes: true,
      metadata: metadataPayload,
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