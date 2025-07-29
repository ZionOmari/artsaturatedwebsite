import { ShoppingCart, Star, ExternalLink, FileText, Shirt } from 'lucide-react'
import { useState } from 'react'
import SimpleCheckout from './SimpleCheckout'

interface MerchProps {
  isSaturated?: boolean
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  size?: string;
  color?: string;
}

const Merch = ({ isSaturated = false }: MerchProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const artworkPrints: Product[] = [
    {
      id: 'print-1',
      name: "ArtSaturated Print #1",
      price: 5.00,
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_2.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 'print-2',
      name: "ArtSaturated Print #2", 
      price: 5.00,
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_3.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 'print-3',
      name: "ArtSaturated Print #3",
      price: 5.00, 
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_4.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 'print-4',
      name: "ArtSaturated Print #4",
      price: 5.00,
      description: "High-quality art print on premium paper", 
      image: "/assets/images/SimpleScanStation20250422152626_5.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    }
  ];

  const hoodies: Product[] = [
    {
      id: 'hoodie-1',
      name: "ArtSaturated Hoodie - Black",
      price: 45.00,
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_2.jpg",
      category: "Hoodie",
      color: "Black"
    },
    {
      id: 'hoodie-2',
      name: "ArtSaturated Hoodie - White", 
      price: 45.00,
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_3.jpg",
      category: "Hoodie",
      color: "White"
    },
    {
      id: 'hoodie-3',
      name: "ArtSaturated Hoodie - Black",
      price: 45.00,
      description: "Premium cotton hoodie with your favorite ArtSaturated design", 
      image: "/assets/images/SimpleScanStation20250422152626_4.jpg",
      category: "Hoodie",
      color: "Black"
    },
    {
      id: 'hoodie-4',
      name: "ArtSaturated Hoodie - White",
      price: 45.00,
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_5.jpg", 
      category: "Hoodie",
      color: "White"
    }
  ];

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <section id="merch" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isSaturated ? 'crayola-gradient' : 'bg-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Shop</span>
            <br />
            <span className={isSaturated ? "text-gray-900" : "text-white"}>the Drop</span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
            isSaturated ? "text-gray-700" : "text-gray-300"
          }`}>
            Wear your passion. Every piece is a conversation starter, a statement of creativity, 
            and a way to carry the ArtSaturated energy with you.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-bold">
            <ShoppingCart size={20} />
            Secure Stripe Payments
          </div>
        </div>

        {/* Art Prints Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 text-yellow-400">
            <FileText size={32} />
            Art Prints - $5 Each
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworkPrints.map((print) => (
              <div
                key={print.id}
                className="bg-black border-2 border-gray-800 rounded-xl overflow-hidden hover:border-yellow-400 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={print.image} 
                    alt={print.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    {print.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">
                    {print.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {print.description}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                    Size: {print.size}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                      ${print.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleBuyNow(print)}
                      className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200 flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hoodies Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 text-yellow-400">
            <Shirt size={32} />
            Premium Hoodies - $45 Each
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hoodies.map((hoodie) => (
              <div
                key={hoodie.id}
                className="bg-black border-2 border-gray-800 rounded-xl overflow-hidden hover:border-yellow-400 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={hoodie.image} 
                    alt={hoodie.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black text-yellow-400 px-2 py-1 rounded-full text-xs font-bold border border-yellow-400">
                    {hoodie.color}
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    {hoodie.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">
                    {hoodie.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {hoodie.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                      ${hoodie.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleBuyNow(hoodie)}
                      className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200 flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Features */}
        <div className="text-center bg-gray-900 rounded-2xl p-8 border-2 border-yellow-400">
          <ShoppingCart size={48} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Secure & Simple Shopping
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-yellow-400 font-bold">🔒 Secure Payments</div>
              <div className="text-gray-400 text-sm">Powered by Stripe</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">📦 Fast Shipping</div>
              <div className="text-gray-400 text-sm">3-5 business days</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">⭐ Quality Guaranteed</div>
              <div className="text-gray-400 text-sm">Premium materials</div>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Each piece is carefully crafted and shipped with love. 
            Join the ArtSaturated community and wear your creativity.
          </p>
        </div>
      </div>

      {/* Simple Checkout Modal */}
      {selectedProduct && (
        <SimpleCheckout
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isSaturated={isSaturated}
        />
      )}
    </section>
  )
}

export default Merch 