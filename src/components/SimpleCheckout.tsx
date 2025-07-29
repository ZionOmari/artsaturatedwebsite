import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Lock, Check, Mail } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface SimpleCheckoutProps {
  product: Product;
  onClose: () => void;
  isSaturated?: boolean;
}

const SimpleCheckout: React.FC<SimpleCheckoutProps> = ({ product, onClose, isSaturated = false }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-black border-2 border-yellow-400 rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Check size={64} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Order Received!</h2>
            <p className="text-white">Thank you for your interest! We'll contact you shortly about payment and shipping.</p>
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
            <Mail size={24} />
            Order Request
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
            <h3 className="text-yellow-400 font-semibold">Your Information</h3>
            
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
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
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
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Request Order
          </button>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              We'll contact you via email to arrange payment and shipping.
            </p>
            <p className="text-yellow-400 text-xs">
              🔒 Secure Stripe payments coming soon!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleCheckout; 