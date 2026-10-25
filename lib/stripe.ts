// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build',
  {
    apiVersion: '2024-06-20' as any,
    appInfo: {
      name: 'AgentPass HK Licensing Platform',
      version: '1.0.0',
    },
  }
);