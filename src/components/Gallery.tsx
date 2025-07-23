import { Image, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import { useState } from 'react'

interface GalleryProps {
  isSaturated?: boolean
}

const Gallery = ({ isSaturated = false }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const artwork = [
    {
      id: 1,
      title: "ArtSaturated Original #1",
      description: "A vibrant piece exploring the intersection of movement and color",
      image: "/assets/images/SimpleScanStation20250422152626_2.jpg",
      category: "Original Art"
    },
    {
      id: 2,
      title: "ArtSaturated Original #2",
      description: "Abstract representation of creative energy and artistic flow",
      image: "/assets/images/SimpleScanStation20250422152626_3.jpg",
      category: "Original Art"
    },
    {
      id: 3,
      title: "ArtSaturated Original #3",
      description: "A visual journey through the creative process and artistic inspiration",
      image: "/assets/images/SimpleScanStation20250422152626_4.jpg",
      category: "Original Art"
    },
    {
      id: 4,
      title: "ArtSaturated Original #4",
      description: "The signature piece that embodies the ArtSaturated philosophy",
      image: "/assets/images/SimpleScanStation20250422152626_5.jpg",
      category: "Original Art"
    }
  ]

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % artwork.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? artwork.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section id="gallery" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isSaturated ? 'crayola-gradient' : 'muted-gradient'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={isSaturated ? "gradient-text" : "text-gray-300"}>Crayon-Stained</span>
            <br />
            <span className={isSaturated ? "text-gray-900" : "text-gray-200"}>Soundscapes</span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isSaturated ? "text-gray-700" : "text-gray-400"
          }`}>
            A visual journey through the intersection of movement, music, and medium. 
            Each piece tells a story of creative transformation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {artwork.map((piece, index) => (
            <div
              key={piece.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className={`backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                isSaturated 
                  ? 'bg-crayola-black/50 border-crayola-gray/20 hover:border-crayola-yellow/50' 
                  : 'bg-gray-800/50 border-gray-600/20 hover:border-gray-500/50'
              }`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={piece.image} 
                    alt={piece.title}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 flex items-center justify-center ${
                    isSaturated 
                      ? 'bg-crayola-black/0 group-hover:bg-crayola-black/50' 
                      : 'bg-gray-900/0 group-hover:bg-gray-900/50'
                  }`}>
                    <div title="Expand image">
                      <Maximize2 
                        size={48} 
                        className={`${
                          isSaturated ? "text-crayola-white" : "text-gray-300"
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                      />
                    </div>
                  </div>
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                    isSaturated 
                      ? 'bg-crayola-yellow text-crayola-black' 
                      : 'bg-gray-600 text-gray-200'
                  }`}>
                    {piece.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-lg font-bold transition-colors duration-300 mb-2 ${
                    isSaturated 
                      ? "text-gray-900 group-hover:text-crayola-yellow" 
                      : "text-gray-200 group-hover:text-gray-300"
                  }`}>
                    {piece.title}
                  </h3>
                  <p className={`text-sm ${
                    isSaturated ? "text-crayola-gray" : "text-gray-500"
                  }`}>
                    {piece.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center p-8 rounded-2xl ${
          isSaturated ? '' : 'bg-gray-800'
        }`}>
          <Image size={48} className={`mx-auto mb-4 ${
            isSaturated ? "text-crayola-white" : "text-gray-300"
          }`} />
          <h3 className={`text-2xl font-bold mb-4 ${
            isSaturated ? "text-crayola-white" : "text-gray-200"
          }`}>
            Available as Prints & Hoodies
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            isSaturated ? "text-crayola-white" : "text-gray-300"
          }`}>
            Love what you see? These pieces are available as high-quality prints ($5 each) 
            and premium hoodies ($45 each). Check out the merch section!
          </p>
          
          <button
            className={`px-8 py-3 rounded-full font-bold transition-colors duration-300 ${
              isSaturated 
                ? 'bg-crayola-white text-crayola-black hover:bg-crayola-yellow' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
            onClick={() => {
              const merchSection = document.getElementById('merch')
              if (merchSection) {
                merchSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Shop the Collection
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-crayola-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={artwork[selectedImage].image} 
              alt={artwork[selectedImage].title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={prevImage}
                className="bg-crayola-white/20 text-crayola-white p-2 rounded-full hover:bg-crayola-yellow hover:text-crayola-black transition-colors duration-300"
                title="Previous image"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="bg-crayola-white/20 text-crayola-white p-2 rounded-full hover:bg-crayola-yellow hover:text-crayola-black transition-colors duration-300"
                title="Next image"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-crayola-black/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-xl font-bold text-crayola-white mb-2">
                {artwork[selectedImage].title}
              </h3>
              <p className="text-crayola-gray">
                {artwork[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
  }

export default Gallery 