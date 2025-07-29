import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { ShoppingCart, CreditCard, Lock, Check } from 'lucide-react';

// Load Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface StripeCheckoutProps {
  product: Product;
  onClose: () => void;
  isSaturated?: boolean;
}

const CheckoutForm: React.FC<StripeCheckoutProps> = ({ product, onClose, isSaturated = false }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          address: customerInfo.address
        }
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      // Here you would typically send the payment method to your backend
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        setPaymentSuccess(true);
        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      setError('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-black border-2 border-yellow-400 rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Check size={64} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Payment Successful!</h2>
            <p className="text-white">Thank you for your purchase. You'll receive an email confirmation shortly.</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="text-yellow-400 font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between text-white">
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <CreditCard size={24} />
            Secure Checkout
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Product Summary */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-yellow-400 font-semibold">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
              <p className="text-white font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
              
              <input
                type="email"
                placeholder="Email Address"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              value={customerInfo.address.line1}
              onChange={(e) => setCustomerInfo({
                ...customerInfo, 
                address: {...customerInfo.address, line1: e.target.value}
              })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              required
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={customerInfo.address.city}
                onChange={(e) => setCustomerInfo({
                  ...customerInfo, 
                  address: {...customerInfo.address, city: e.target.value}
                })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
              
              <input
                type="text"
                placeholder="State"
                value={customerInfo.address.state}
                onChange={(e) => setCustomerInfo({
                  ...customerInfo, 
                  address: {...customerInfo.address, state: e.target.value}
                })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
              
              <input
                type="text"
                placeholder="ZIP Code"
                value={customerInfo.address.postal_code}
                onChange={(e) => setCustomerInfo({
                  ...customerInfo, 
                  address: {...customerInfo.address, postal_code: e.target.value}
                })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold flex items-center gap-2">
              <Lock size={20} />
              Payment Information
            </h3>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                      backgroundColor: '#111827',
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Order Total */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Total:</span>
              <span className="text-yellow-400 font-bold text-xl">${product.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Complete Purchase
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs text-center">
            Secured by Stripe. Your payment information is encrypted and secure.
          </p>
        </form>
      </div>
    </div>
  );
};

const StripeCheckout: React.FC<StripeCheckoutProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default StripeCheckout; 