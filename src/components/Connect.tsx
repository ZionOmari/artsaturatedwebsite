import React from 'react'
import { Mail, Instagram, Twitter, Youtube, Linkedin, Github } from 'lucide-react'

const Connect = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/artsaturated',
      icon: <Instagram size={24} />,
      color: 'text-crayola-pink'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/artsaturated',
      icon: <Twitter size={24} />,
      color: 'text-crayola-blue'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@artsaturated',
      icon: <Youtube size={24} />,
      color: 'text-crayola-red'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/artsaturated',
      icon: <Linkedin size={24} />,
      color: 'text-crayola-blue'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/artsaturated',
      icon: <Github size={24} />,
      color: 'text-crayola-gray'
    }
  ]

  return (
    <section id="connect" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Let's</span>
            <br />
            <span className="text-gray-900">Connect</span>
          </h2>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
            Ready to collaborate, create, or just chat about art and movement?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-crayola-yellow focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-crayola-yellow focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-crayola-yellow focus:border-transparent"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-crayola-yellow text-crayola-black px-6 py-3 rounded-lg font-bold hover:bg-crayola-yellow/80 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900">
              Follow the Journey
            </h3>
            
            <p className="text-gray-700 mb-8">
              Stay connected and see the creative process unfold in real-time.
            </p>

            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-crayola-yellow transition-all duration-200 group`}
                >
                  <div className={`${social.color} group-hover:scale-110 transition-transform duration-200`}>
                    {social.icon}
                  </div>
                  <span className="text-gray-900 font-medium group-hover:text-crayola-yellow transition-colors duration-200">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-crayola-pink/10 to-crayola-blue/10 rounded-xl">
              <h4 className="text-xl font-bold mb-3 text-gray-900">
                Newsletter
              </h4>
              <p className="text-gray-700 mb-4">
                Get updates on new releases, behind-the-scenes content, and exclusive offers.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-crayola-yellow focus:border-transparent"
                />
                <button className="bg-crayola-yellow text-crayola-black px-4 py-2 rounded-lg font-bold hover:bg-crayola-yellow/80 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Connect 