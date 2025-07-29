import { useState, useEffect } from 'react'
import { Menu, X, Palette } from 'lucide-react'

interface NavigationProps {
  onSaturateToggle: () => void
  isSaturated: boolean
}

const Navigation = ({ onSaturateToggle, isSaturated }: NavigationProps) => {
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
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            ArtSaturated
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
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
                  ? 'text-blue-600 shadow-lg border-blue-600 bg-white hover:bg-blue-50' 
                  : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
              }`}
              style={{
                animation: 'none'
              }}
              title="Toggle saturate effect"
            >
              <Palette size={16} />
              {isSaturated ? "Saturated" : "Saturate"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Saturate Button for Mobile */}
            <button
              onClick={() => onSaturateToggle()}
              className={`relative px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 transition-all duration-300 overflow-visible border-2 ${
                isSaturated 
                  ? 'text-blue-600 border-blue-600 bg-white hover:bg-blue-50' 
                  : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
              }`}
              style={{
                animation: 'none'
              }}
            >
              <Palette size={12} />
              {isSaturated ? "Saturated" : "Saturate"}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              title={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 py-4 shadow-lg border border-gray-200">
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
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