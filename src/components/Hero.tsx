import React, { useState } from 'react'
import { ArrowDown, ShoppingBag, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeroProps {
  isSaturated?: boolean
}

const Hero = ({ isSaturated = false }: HeroProps) => {
  const [isExploding, setIsExploding] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Removed background - now handled by layers */}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="gradient-text">ArtSaturated</span>
          </h1>
          
          <h2 className={`text-2xl md:text-3xl font-light mb-8 ${
            isSaturated ? "text-gray-700" : "text-gray-500"
          }`}>
            Zion Omari: Creative Engineer
          </h2>

          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
            isSaturated ? "text-gray-600" : "text-gray-600"
          }`}>
            Where movement meets medium, where sound becomes sight, 
            and where every creation tells a story of passion and purpose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className={`relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-visible border-2 ${
                isSaturated 
                  ? 'text-crayola-white border-crayola-white/30 bg-transparent hover:border-crayola-white/50' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
              }`}
              style={{
                animation: 'none'
              }}
              onClick={() => {
                if (isSaturated) {
                  setIsExploding(true);
                  setTimeout(() => setIsExploding(false), 800);
                }
                navigate('/shop');
              }}
            >
              {/* Color Leak Drips - Behind button (reduced for performance) */}
              {isSaturated && (
                <>
                  <div 
                    className="absolute bottom-0 left-4 w-2 rounded-full opacity-90"
                    style={{
                      background: 'linear-gradient(to bottom, #FF6B6B, #FFA500)',
                      animation: 'drip 8s ease-in-out infinite',
                      animationDelay: '0s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-6 w-2 rounded-full opacity-85"
                    style={{
                      background: 'linear-gradient(to bottom, #FF69B4, #9B59B6)',
                      animation: 'drip 8s ease-in-out infinite',
                      animationDelay: '3s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                  <div 
                    className="absolute bottom-0 left-1/2 w-2.5 rounded-full opacity-80"
                    style={{
                      background: 'linear-gradient(to bottom, #FFD93D, #3498DB)',
                      animation: 'drip 8s ease-in-out infinite',
                      animationDelay: '6s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                </>
              )}
              
              {/* Color explosion effects */}
              {isExploding && (
                <>
                  <div 
                    className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FF6B6B, #FFA500)',
                      animation: 'colorExplosion 0.8s ease-out forwards',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FF69B4, #9B59B6)',
                      animation: 'colorExplosion 0.8s ease-out forwards',
                      animationDelay: '0.1s',
                      transform: 'translate(-30%, -50%)',
                      zIndex: 10
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FFD93D, #3498DB)',
                      animation: 'colorExplosion 0.8s ease-out forwards',
                      animationDelay: '0.2s',
                      transform: 'translate(-70%, -50%)',
                      zIndex: 10
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #9B59B6, #3498DB)',
                      animation: 'colorExplosion 0.8s ease-out forwards',
                      animationDelay: '0.15s',
                      transform: 'translate(20%, -50%)',
                      zIndex: 10
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 w-7 h-7 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FFA500, #FF69B4)',
                      animation: 'colorExplosion 0.8s ease-out forwards',
                      animationDelay: '0.05s',
                      transform: 'translate(50%, -50%)',
                      zIndex: 10
                    }}
                  />
                </>
              )}
              
              <ShoppingBag size={20} />
              Shop the Drop
            </button>

            <button
              className={`border-2 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300 ${
                isSaturated 
                  ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                  : 'border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
              onClick={() => scrollToSection('gallery')}
            >
              <Image size={20} />
              Explore the Work
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div
            className={`cursor-pointer ${
              isSaturated ? "text-gray-600" : "text-gray-500"
            }`}
            onClick={() => scrollToSection('about')}
          >
            <ArrowDown size={24} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 