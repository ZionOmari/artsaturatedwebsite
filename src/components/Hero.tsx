import React from 'react'
import { ArrowDown, ShoppingBag, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BuyPrintButton from './BuyPrintButton'
import { STORE } from '../config/store'

const Hero = () => {
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
          
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-700">
            Zion Omari: Creative Engineer
          </h2>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-600">
            Where movement meets medium, where sound becomes sight, 
            and where every creation tells a story of passion and purpose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-visible border-2 text-crayola-white border-crayola-white/30 bg-transparent hover:border-crayola-white/50"
              style={{
                animation: 'none'
              }}
              onClick={() => navigate('/shop')}
            >
              
              <ShoppingBag size={20} />
              Shop the Drop
            </button>

            <button
              className="border-2 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              onClick={() => scrollToSection('gallery')}
            >
              <Image size={20} />
              Explore the Work
            </button>

            <BuyPrintButton href={STORE.PRINT_PAYMENT_LINK} label="Buy a print" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div
            className="cursor-pointer text-gray-600"
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