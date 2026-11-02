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
    console.error('STRIPE_WEBHOOK_SECRET is not configured on server.');
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
      
      // Prioritize client_reference_id bound during authenticated checkout
      const userEmail = 
        session.client_reference_id || 
        session.metadata?.userEmail || 
        session.customer_details?.email;

      const userTier = session.metadata?.userTier || 'EAQE_PRO';
      const billingInterval = session.metadata?.billingInterval || '3_monthly';
      const targetTrack = session.metadata?.targetTrack || (userTier === 'SQE_PRO' ? 'SQE' : 'EAQE');

      if (!userEmail || userEmail === 'guest@agentpass.hk') {
        console.warn(`[WEBHOOK WARNING] Checkout completed without an authenticated user email. Session: ${session.id}`);
        break;
      }

      console.log(`[PROVISION SUCCESS] Unlocked ${userTier} for ${userEmail} (${billingInterval}, ${targetTrack})`);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      const amountRefunded = (charge.amount_refunded / 100).toFixed(2);
      const customerEmail = charge.billing_details?.email || charge.receipt_email;
      console.log(`[REFUND PROCESSED] Charge ID: ${charge.id} | Amount: HK$${amountRefunded} | Customer: ${customerEmail}`);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[SUBSCRIPTION UPDATED] ${subscription.id} status: ${subscription.status}`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[SUBSCRIPTION CANCELLED] ${subscription.id}`);
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