import { ShoppingCart, Star, ExternalLink, FileText, Shirt } from 'lucide-react'

interface MerchProps {
  isSaturated?: boolean
}

const Merch = ({ isSaturated = false }: MerchProps) => {
  const artworkPrints = [
    {
      id: 1,
      name: "ArtSaturated Print #1",
      price: "$5.00",
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_2.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 2,
      name: "ArtSaturated Print #2", 
      price: "$5.00",
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_3.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 3,
      name: "ArtSaturated Print #3",
      price: "$5.00", 
      description: "High-quality art print on premium paper",
      image: "/assets/images/SimpleScanStation20250422152626_4.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    },
    {
      id: 4,
      name: "ArtSaturated Print #4",
      price: "$5.00",
      description: "High-quality art print on premium paper", 
      image: "/assets/images/SimpleScanStation20250422152626_1.jpg",
      category: "Print",
      size: "8.5\" x 11\""
    }
  ]

  const hoodies = [
    {
      id: 1,
      name: "ArtSaturated Hoodie - Black",
      price: "$45.00",
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_2.jpg",
      category: "Hoodie",
      color: "Black"
    },
    {
      id: 2,
      name: "ArtSaturated Hoodie - White", 
      price: "$45.00",
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_3.jpg",
      category: "Hoodie",
      color: "White"
    },
    {
      id: 3,
      name: "ArtSaturated Hoodie - Black",
      price: "$45.00",
      description: "Premium cotton hoodie with your favorite ArtSaturated design", 
      image: "/assets/images/SimpleScanStation20250422152626_4.jpg",
      category: "Hoodie",
      color: "Black"
    },
    {
      id: 4,
      name: "ArtSaturated Hoodie - White",
      price: "$45.00",
      description: "Premium cotton hoodie with your favorite ArtSaturated design",
      image: "/assets/images/SimpleScanStation20250422152626_5.jpg", 
      category: "Hoodie",
      color: "White"
    }
  ]

  return (
    <section id="merch" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isSaturated ? 'crayola-gradient' : 'muted-gradient'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={isSaturated ? "gradient-text" : "text-gray-300"}>Shop</span>
            <br />
            <span className={isSaturated ? "text-gray-900" : "text-gray-200"}>the Drop</span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
            isSaturated ? "text-gray-700" : "text-gray-400"
          }`}>
            Wear your passion. Every piece is a conversation starter, a statement of creativity, 
            and a way to carry the ArtSaturated energy with you.
          </p>

          <button
            className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 ${
              isSaturated 
                ? 'text-crayola-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title="View full collection"
          >
            <ExternalLink size={20} />
            Full Collection Coming Soon
          </button>
        </div>

        {/* Art Prints Section */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 ${
            isSaturated ? "text-gray-900" : "text-gray-200"
          }`}>
            <FileText size={32} className={isSaturated ? "text-crayola-yellow" : "text-gray-400"} />
            Art Prints - $5 Each
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artworkPrints.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer"
              >
                <div className={`backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                  isSaturated 
                    ? 'bg-crayola-black/50 border-crayola-gray/20 hover:border-crayola-yellow/50' 
                    : 'bg-gray-800/50 border-gray-600/20 hover:border-gray-500/50'
                }`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                      isSaturated 
                        ? 'bg-crayola-yellow text-crayola-black' 
                        : 'bg-gray-600 text-gray-200'
                    }`}>
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        isSaturated 
                          ? "text-gray-900 group-hover:text-crayola-yellow" 
                          : "text-gray-200 group-hover:text-gray-300"
                      }`}>
                        {item.name}
                      </h3>
                      <span className={`font-bold text-lg ${
                        isSaturated ? "text-crayola-yellow" : "text-gray-400"
                      }`}>
                        {item.price}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      isSaturated ? "text-crayola-gray" : "text-gray-500"
                    }`}>
                      {item.description}
                    </p>
                    
                    <p className={`text-xs mb-4 ${
                      isSaturated ? "text-crayola-gray" : "text-gray-500"
                    }`}>
                      Size: {item.size}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${
                              isSaturated ? "text-crayola-yellow" : "text-gray-500"
                            } fill-current`} 
                          />
                        ))}
                      </div>
                      <span className={`text-xs ${
                        isSaturated ? "text-crayola-gray" : "text-gray-500"
                      }`}>
                        + Shipping
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hoodies Section */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 ${
            isSaturated ? "text-gray-900" : "text-gray-200"
          }`}>
            <Shirt size={32} className={isSaturated ? "text-crayola-yellow" : "text-gray-400"} />
            Hoodies - $45 Each
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hoodies.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer"
              >
                <div className={`backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                  isSaturated 
                    ? 'bg-crayola-black/50 border-crayola-gray/20 hover:border-crayola-yellow/50' 
                    : 'bg-gray-800/50 border-gray-600/20 hover:border-gray-500/50'
                }`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                      isSaturated 
                        ? 'bg-crayola-yellow text-crayola-black' 
                        : 'bg-gray-600 text-gray-200'
                    }`}>
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        isSaturated 
                          ? "text-gray-900 group-hover:text-crayola-yellow" 
                          : "text-gray-200 group-hover:text-gray-300"
                      }`}>
                        {item.name}
                      </h3>
                      <span className={`font-bold text-lg ${
                        isSaturated ? "text-crayola-yellow" : "text-gray-400"
                      }`}>
                        {item.price}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      isSaturated ? "text-crayola-gray" : "text-gray-500"
                    }`}>
                      {item.description}
                    </p>
                    
                    <p className={`text-xs mb-4 ${
                      isSaturated ? "text-crayola-gray" : "text-gray-500"
                    }`}>
                      Color: {item.color}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${
                              isSaturated ? "text-crayola-yellow" : "text-gray-500"
                            } fill-current`} 
                          />
                        ))}
                      </div>
                      <span className={`text-xs ${
                        isSaturated ? "text-crayola-gray" : "text-gray-500"
                      }`}>
                        + Shipping
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Integration Notice */}
        <div
          className={`text-center p-8 rounded-2xl ${
            isSaturated 
                              ? '' 
              : 'bg-gray-800'
          }`}
        >
          <ShoppingCart size={48} className="text-crayola-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-crayola-white">
            Ready to Order?
          </h3>
          <p className="text-crayola-white mb-6 max-w-2xl mx-auto">
            We're setting up the full e-commerce experience with secure payment processing. 
            Sign up below to be notified when the store launches!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full bg-crayola-white/20 text-crayola-white placeholder-crayola-gray border border-crayola-white/30 focus:border-crayola-yellow focus:outline-none flex-1 max-w-md"
            />
            <button
              className="bg-crayola-white text-crayola-black px-8 py-3 rounded-full font-bold hover:bg-crayola-yellow transition-colors duration-300"
            >
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Merch 