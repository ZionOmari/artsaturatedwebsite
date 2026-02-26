import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// Replace with your actual Stripe publishable key
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

// Stripe appearance configuration
export const getStripeOptions = (amount: number) => ({
  mode: 'payment' as const,
  amount: Math.round(amount * 100), // Convert to cents
  currency: 'usd',
  appearance: {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#FFD93D', // Yellow
      colorBackground: '#000000', // Black
      colorText: '#ffffff',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
});

// Simple provider that just provides the stripe promise
interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return <>{children}</>;
};
