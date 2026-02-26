import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { StripeCheckout } from './StripeCheckout';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckoutOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-start justify-end p-4">
        <div className="bg-black border border-yellow-400 rounded-lg w-full max-w-md h-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag size={20} />
              Cart ({getItemCount()})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl text-yellow-400/20 mb-4">
                  <ShoppingBag />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400">Add some awesome merch to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className="bg-gray-900/50 border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Product Image Placeholder */}
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag size={20} className="text-yellow-400/50" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm leading-tight mb-1">
                          {item.name}
                        </h3>
                        <div className="text-xs text-gray-400 space-y-1">
                          {item.size && <div>Size: {item.size}</div>}
                          {item.color && <div>Color: {item.color}</div>}
                          <div className="text-yellow-400 font-bold">${item.price}</div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white text-xs"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-white text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white text-xs"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors ml-auto"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right mt-3 pt-3 border-t border-gray-700">
                      <span className="text-yellow-400 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-yellow-400/20 p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total:</span>
                <span className="text-xl font-bold text-yellow-400">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>

              {/* Security Note */}
              <p className="text-xs text-gray-400 text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stripe Checkout Modal */}
      <StripeCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
