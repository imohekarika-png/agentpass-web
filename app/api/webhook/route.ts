// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json(
      { error: 'Webhook secret unconfigured on server' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Signature Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userTier = session.metadata?.userTier || 'EAQE_PRO';
      const userEmail = session.customer_details?.email || session.metadata?.userEmail;
      console.log(`[PROVISION] Payment Succeeded for ${userEmail}. Tier: ${userTier}`);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[SUBSCRIPTION UPDATED] ${subscription.id} status: ${subscription.status}`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[SUBSCRIPTION DELETED] ${subscription.id}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.warn(`[FAILED INVOICE] Payment failed for customer ${invoice.customer}`);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}