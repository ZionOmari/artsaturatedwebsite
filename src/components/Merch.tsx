import React, { useState } from 'react'
import { Shirt, ShoppingCart, Star, Package, Image, Gift, Music } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Merch = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addItem, getItemCount } = useCart()

  const categories = [
    { id: 'all', label: 'All Products', icon: <Package size={20} /> },
    { id: 'clothing', label: 'Clothing', icon: <Shirt size={20} /> },
    { id: 'prints', label: 'Prints', icon: <Image size={20} /> },
    { id: 'mystery', label: 'Mystery Merch', icon: <Gift size={20} /> },
    { id: 'bundles', label: 'Record Bundles', icon: <Music size={20} /> }
  ]

  const products = [
    // Clothing Section
    {
      id: 1,
      name: "ArtSaturated T-Shirt",
      description: "Premium cotton tee with signature logo design",
      price: 25,
      category: "clothing",
      image: "/api/placeholder/300/300",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Yellow", "White"]
    },
    {
      id: 2,
      name: "ArtSaturated Hoodie",
      description: "Cozy pullover hoodie with embroidered artwork",
      price: 55,
      category: "clothing",
      image: "/api/placeholder/300/300",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Yellow", "Gray"]
    },
    {
      id: 3,
      name: "ArtSaturated Long Sleeve",
      description: "Classic long sleeve with front and back designs",
      price: 35,
      category: "clothing",
      image: "/api/placeholder/300/300",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Yellow", "White"]
    },
    {
      id: 4,
      name: "ArtSaturated Sweatpants",
      description: "Comfortable joggers with side stripe detail",
      price: 45,
      category: "clothing",
      image: "/api/placeholder/300/300",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Yellow", "Gray"]
    },
    // Prints Section
    {
      id: 5,
      name: "Abstract Motion Print",
      description: "11x14 limited edition art print on premium paper",
      price: 20,
      category: "prints",
      image: "/api/placeholder/300/300",
      sizes: ["11x14", "16x20", "24x36"],
      limited: true
    },
    {
      id: 6,
      name: "Color Explosion Series",
      description: "Set of 3 matching prints showcasing vibrant energy",
      price: 45,
      category: "prints",
      image: "/api/placeholder/300/300",
      sizes: ["8x10", "11x14"],
      limited: true
    },
    // Mystery Merch
    {
      id: 7,
      name: "Mystery Box - Small",
      description: "Surprise collection of stickers, pins, and small items",
      price: 15,
      category: "mystery",
      image: "/api/placeholder/300/300",
      mystery: true
    },
    {
      id: 8,
      name: "Mystery Box - Large",
      description: "Premium mystery box with clothing item and surprises",
      price: 35,
      category: "mystery",
      image: "/api/placeholder/300/300",
      mystery: true
    },
    // Record Bundles
    {
      id: 9,
      name: "Vinyl + Merch Bundle",
      description: "Limited vinyl record with exclusive t-shirt",
      price: 65,
      category: "bundles",
      image: "/api/placeholder/300/300",
      bundle: true,
      limited: true
    },
    {
      id: 10,
      name: "Complete Collection Bundle",
      description: "Everything: vinyl, hoodie, prints, and mystery items",
      price: 120,
      category: "bundles",
      image: "/api/placeholder/300/300",
      bundle: true,
      limited: true
    }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const handleAddToCart = (product: any) => {
    addItem(product)
  }

  return (
    <section id="merch" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Shop</span>
            <br />
            <span className="text-white">ArtSaturated</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Premium merch designed for creators and dreamers
          </p>
        </div>

        {/* Cart Summary */}
        {getItemCount() > 0 && (
          <div className="fixed top-20 right-4 z-40 bg-black/90 backdrop-blur-sm border border-yellow-400 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-yellow-400">
              <ShoppingCart size={20} />
              <span className="font-bold">{getItemCount()} items in cart</span>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-black/50 text-white border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-black/80 backdrop-blur-sm border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-yellow-400/10 to-transparent p-8 flex items-center justify-center">
                <div className="text-6xl text-yellow-400/50">
                  {product.category === 'clothing' && <Shirt />}
                  {product.category === 'prints' && <Image />}
                  {product.category === 'mystery' && <Gift />}
                  {product.category === 'bundles' && <Music />}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {product.name}
                  </h3>
                  {(product as any).limited && (
                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                      LIMITED
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Sizes/Options */}
                {(product as any).sizes && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Available sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {(product as any).sizes.map((size: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {(product as any).colors && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Colors:</p>
                    <div className="flex flex-wrap gap-1">
                      {(product as any).colors.map((color: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ShoppingCart size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl text-yellow-400/50 mb-4">
              <Package />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              New drops coming soon
            </h3>
            <p className="text-gray-300 mb-6">
              Be the first to know about new releases, exclusive designs, and limited drops.
            </p>
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-200">
              Join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Merch 