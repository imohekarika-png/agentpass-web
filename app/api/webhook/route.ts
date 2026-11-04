// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Supabase Admin Client using the Service Role Key (bypasses RLS to provision tiers)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is unconfigured.');
    return NextResponse.json({ error: 'Webhook secret unconfigured on server' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Signature Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userEmail = 
        session.client_reference_id || 
        session.metadata?.userEmail || 
        session.customer_details?.email;

      const userTier = session.metadata?.userTier || 'EAQE_PRO';

      if (!userEmail || userEmail === 'guest@agentpass.hk') {
        console.warn(`[WEBHOOK] Checkout completed without a valid user email. Session: ${session.id}`);
        break;
      }

      const cleanEmail = userEmail.trim().toLowerCase();

      // Atomically elevate the candidate's tier in the database
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({
          tier: userTier,
          updated_at: new Date().toISOString()
        })
        .eq('email', cleanEmail)
        .select('id, email, tier');

      if (error) {
        console.error(`[PROVISION ERROR] Failed to upgrade ${cleanEmail}:`, error);
      } else {
        console.log(`[PROVISION SUCCESS] Elevated ${cleanEmail} to tier: ${userTier}`, data);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      const customerEmail = charge.billing_details?.email || charge.receipt_email;

      if (customerEmail) {
        const cleanEmail = customerEmail.trim().toLowerCase();
        // Revert user back to Free Preview upon refund
        await supabaseAdmin
          .from('profiles')
          .update({
            tier: 'FREE_PREVIEW',
            updated_at: new Date().toISOString()
          })
          .eq('email', cleanEmail);

        console.log(`[REFUND PROCESSED] Revoked PRO access for: ${cleanEmail}`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      const customerEmail = (customer as Stripe.Customer).email;

      if (customerEmail) {
        const cleanEmail = customerEmail.trim().toLowerCase();
        await supabaseAdmin
          .from('profiles')
          .update({
            tier: 'FREE_PREVIEW',
            updated_at: new Date().toISOString()
          })
          .eq('email', cleanEmail);

        console.log(`[SUBSCRIPTION CANCELLED] Downgraded to FREE_PREVIEW: ${cleanEmail}`);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}