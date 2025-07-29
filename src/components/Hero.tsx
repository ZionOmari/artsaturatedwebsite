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
      {/* Background is now handled by App.tsx layers */}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="text-white">Welcome to</span>
            <br />
            <span className="text-white">ArtSaturated</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-white">
            Zion Omari: Creative Engineer
          </h2>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white">
            Where movement meets medium, where sound becomes sight, 
            and where every creation tells a story of passion and purpose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-visible border-2 bg-white/20 text-white hover:bg-white/30 border-white/30"
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
              className="border-2 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300 border-white text-white hover:bg-white hover:text-gray-900"
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
            className="cursor-pointer text-white hover:text-gray-200 transition-colors"
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