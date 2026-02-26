import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart } from './ShoppingCart'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { getItemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const goHome = () => {
    navigate('/')
    setIsOpen(false)
  }

  const navItems = [
    { id: 'about', label: 'About', type: 'scroll' },
    { id: 'gallery', label: 'Gallery', type: 'scroll' },
    { id: 'connect', label: 'Connect', type: 'scroll' },
    { id: 'shop', label: 'Shop', type: 'navigate' }
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'navigate') {
      navigate('/shop')
      setIsOpen(false)
    } else {
      scrollToSection(item.id)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-crayola-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Takes you home */}
          <div
            className="text-2xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={goHome}
            title="Go to Home"
          >
            ArtSaturated
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-crayola-white hover:text-crayola-yellow hover:scale-105 transition-all duration-200 font-medium"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            ))}
            
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-crayola-white hover:text-crayola-yellow hover:scale-105 transition-all duration-200"
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-crayola-white hover:text-crayola-yellow transition-colors duration-200"
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">
                  {getItemCount()}
                </span>
              )}
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
                  className="text-crayola-white hover:text-crayola-yellow transition-colors duration-200 font-medium text-left py-2"
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Shopping Cart Modal */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </nav>
  )
}

export default Navigation 