/**
 * Stripe Payment Service — integrates Stripe for template purchases.
 * Uses Stripe Checkout for secure, hosted payment pages.
 * 
 * To use: Replace 'pk_test_YOUR_KEY' with your actual Stripe publishable key.
 */
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY';

let stripePromise = null;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

/**
 * Available products/pricing
 * In production, these should come from Stripe Dashboard or an API
 */
export const PRODUCTS = {
  'save-the-date': {
    id: 'save-the-date',
    name: 'Save the Date',
    price: 8.00,
    priceId: 'price_save_the_date',
    description: 'Single Save the Date template',
  },
  'invitation': {
    id: 'invitation',
    name: 'Wedding Invitation',
    price: 12.00,
    priceId: 'price_invitation',
    description: 'Single Wedding Invitation template',
  },
  'rsvp': {
    id: 'rsvp',
    name: 'RSVP Card',
    price: 8.00,
    priceId: 'price_rsvp',
    description: 'Single RSVP card template',
  },
  'thank-you': {
    id: 'thank-you',
    name: 'Thank You Card',
    price: 8.00,
    priceId: 'price_thank_you',
    description: 'Single Thank You card template',
  },
  'full-suite': {
    id: 'full-suite',
    name: 'Full Wedding Suite',
    price: 24.00,
    priceId: 'price_full_suite',
    description: 'Complete set: Save the Date + Invitation + RSVP + Thank You',
  },
};

/**
 * Initiate a Stripe Checkout session
 * In production, this should call your backend to create a Checkout Session
 */
export async function createCheckoutSession(productId, quantity) {
  const product = PRODUCTS[productId];
  if (!product) throw new Error('Unknown product: ' + productId);

  // In production, replace with actual API call to your backend
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ priceId: product.priceId, quantity: quantity || 1 }),
  // });
  // const session = await response.json();
  // return session.id;

  // Placeholder: In dev mode, simulate success
  console.log('Purchase initiated:', product.name, 'x' + (quantity || 1), '= $' + (product.price * (quantity || 1)).toFixed(2));
  return 'cs_test_' + Date.now();
}

/**
 * Redirect to Stripe Checkout
 */
export async function checkout(productId, quantity) {
  const stripe = await getStripe();
  const sessionId = await createCheckoutSession(productId, quantity);
  
  // In production, uncomment:
  // const result = await stripe.redirectToCheckout({ sessionId: sessionId });
  
  console.log('Checkout session created:', sessionId);
  return sessionId;
}

/**
 * Format price as currency string
 */
export function formatPrice(cents) {
  return '$' + (cents / 100).toFixed(2);
}

export function formatPriceDollars(dollars) {
  return '$' + dollars.toFixed(2);
}