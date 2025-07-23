import { useState, useEffect } from 'react'
import { Menu, X, Palette } from 'lucide-react'

interface NavigationProps {
  onSaturateToggle: () => void
  isSaturated: boolean
  isScreenClear?: boolean
}

const Navigation = ({ onSaturateToggle, isSaturated, isScreenClear = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'merch', label: 'Shop' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'connect', label: 'Connect' }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-crayola-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            ArtSaturated
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-crayola-white hover:text-crayola-yellow transition-colors duration-200 font-medium"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            
            {/* Saturate Button */}
            <button
              onClick={() => onSaturateToggle()}
              className={`relative px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 overflow-visible border-2 ${
                isSaturated 
                  ? 'text-crayola-white shadow-lg border-crayola-white/30 bg-transparent hover:border-crayola-white/50' 
                  : 'bg-transparent text-crayola-white border-crayola-white hover:bg-crayola-white/10 hover:border-crayola-yellow'
              }`}
              style={{
                animation: 'none'
              }}
              title="Toggle color mode"
            >
              {/* Color Leak Drips - Behind button (reduced for performance) */}
              {isSaturated && (
                <>
                  <div 
                    className="absolute bottom-0 left-3 w-1.5 rounded-full opacity-90"
                    style={{
                      background: 'linear-gradient(to bottom, #FF6B6B, #FFA500)',
                      animation: 'drip 6s ease-in-out infinite',
                      animationDelay: '0s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-4 w-1.5 rounded-full opacity-85"
                    style={{
                      background: 'linear-gradient(to bottom, #FF69B4, #9B59B6)',
                      animation: 'drip 6s ease-in-out infinite',
                      animationDelay: '2s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                  <div 
                    className="absolute bottom-0 left-1/2 w-2 rounded-full opacity-80"
                    style={{
                      background: 'linear-gradient(to bottom, #FFD93D, #3498DB)',
                      animation: 'drip 6s ease-in-out infinite',
                      animationDelay: '4s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                </>
              )}
              <Palette size={16} />
              {isSaturated && isScreenClear ? "Unsaturate" : isSaturated ? "Saturated" : "Saturate"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Saturate Button for Mobile */}
            <button
              onClick={() => onSaturateToggle()}
              className={`relative px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 transition-all duration-300 overflow-visible border-2 ${
                isSaturated 
                  ? 'text-crayola-white border-crayola-white/30 bg-transparent hover:border-crayola-white/50' 
                  : 'bg-transparent text-crayola-white border-crayola-white hover:bg-crayola-white/10 hover:border-crayola-yellow'
              }`}
              style={{
                animation: 'none'
              }}
            >
              {/* Mobile Color Leak Drips - Behind button (reduced for performance) */}
              {isSaturated && (
                <>
                  <div 
                    className="absolute bottom-0 left-2 w-1 rounded-full opacity-90"
                    style={{
                      background: 'linear-gradient(to bottom, #FF6B6B, #FFA500)',
                      animation: 'drip 8s ease-in-out infinite',
                      animationDelay: '0s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-3 w-1 rounded-full opacity-85"
                    style={{
                      background: 'linear-gradient(to bottom, #FF69B4, #9B59B6)',
                      animation: 'drip 8s ease-in-out infinite',
                      animationDelay: '4s',
                      transformOrigin: 'top',
                      zIndex: -1
                    }}
                  />
                </>
              )}
              <Palette size={12} />
              {isSaturated && isScreenClear ? "Unsaturate" : isSaturated ? "Saturated" : "Saturate"}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-crayola-white hover:text-crayola-yellow transition-colors duration-200"
              title={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-crayola-black/95 backdrop-blur-md rounded-lg mt-2 py-4">
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="text-crayola-white hover:text-crayola-yellow transition-colors duration-200 font-medium text-left"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 