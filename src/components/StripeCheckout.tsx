import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { X, CreditCard, Lock } from 'lucide-react';
import { stripePromise, getStripeOptions } from '../contexts/StripeContext';

interface StripeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

// Inner form component that uses Stripe hooks
const CheckoutForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, getTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // Create payment intent when component mounts
  useEffect(() => {
    if (items.length > 0) {
      createPaymentIntent();
    }
  }, [items]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(getTotal() * 100), // Convert to cents
          currency: 'usd',
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Failed to initialize payment');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed');
    } else {
      // Payment succeeded
      alert('Payment successful!');
      clearCart();
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-400 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard size={20} />
            Secure Checkout
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b border-yellow-400/20">
          <h3 className="font-bold text-white mb-4">Order Summary</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="text-gray-300">
                  <span>{item.name}</span>
                  {item.size && <span className="text-xs text-gray-400"> • {item.size}</span>}
                  {item.color && <span className="text-xs text-gray-400"> • {item.color}</span>}
                  <span className="text-xs text-gray-400"> × {item.quantity}</span>
                </div>
                <span className="text-yellow-400 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
            <span className="font-bold text-white">Total:</span>
            <span className="font-bold text-yellow-400 text-lg">
              ${getTotal().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          {clientSecret ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <PaymentElement 
                  options={{
                    layout: 'tabs'
                  }}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock size={12} />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay $${getTotal().toFixed(2)}`
                )}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-900/50 text-center">
          <p className="text-xs text-gray-400">
            Powered by <span className="text-yellow-400">Stripe</span> • 
            Secure payment processing
          </p>
        </div>
      </div>
    </div>
  );
};

// Main wrapper component that provides Elements with the correct amount
export const StripeCheckout: React.FC<StripeCheckoutProps> = ({ isOpen, onClose }) => {
  const { getTotal } = useCart();

  if (!isOpen) return null;

  const totalAmount = getTotal();
  const options = getStripeOptions(totalAmount);

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm onClose={onClose} />
    </Elements>
  );
};
