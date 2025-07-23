import { Mail, Instagram, ArrowRight, Heart } from 'lucide-react'

interface ConnectProps {
  isSaturated?: boolean
}

const Connect = ({ isSaturated = false }: ConnectProps) => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/artsaturated',
      icon: <Instagram size={24} />,
      color: 'hover:text-crayola-pink'
    },
    {
      name: 'Email',
      url: 'mailto:zion@artsaturated.com',
      icon: <Mail size={24} />,
      color: 'hover:text-crayola-yellow'
    }
  ]

  return (
    <section id="connect" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isSaturated ? 'crayola-gradient' : 'muted-gradient'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={isSaturated ? "gradient-text" : "text-gray-300"}>Let's</span>
            <br />
            <span className={isSaturated ? "text-gray-900" : "text-gray-200"}>Connect</span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isSaturated ? "text-gray-700" : "text-gray-400"
          }`}>
            Ready to dive deeper into the ArtSaturated world? Let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Social Links */}
          <div className="space-y-8">
            <h3 className={`text-2xl font-bold mb-6 ${
              isSaturated ? "text-gray-900" : "text-gray-200"
            }`}>
              Follow the Journey
            </h3>
            
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    isSaturated 
                      ? 'bg-crayola-black/50 border-crayola-gray/20 hover:border-crayola-yellow/50 text-crayola-white' 
                      : 'bg-gray-800/50 border-gray-600/20 hover:border-gray-500/50 text-gray-200'
                  } ${link.color}`}
                  title="Go to link"
                >
                  <div className={isSaturated ? "text-crayola-yellow" : "text-gray-400"}>
                    {link.icon}
                  </div>
                  <div>
                    <div className="font-bold">{link.name}</div>
                    <div className={`text-sm ${
                      isSaturated ? "text-crayola-gray" : "text-gray-500"
                    }`}>
                      {link.name === 'Instagram' ? 'Follow for daily inspiration' : 'Get in touch directly'}
                    </div>
                  </div>
                  <ArrowRight size={20} className="ml-auto opacity-50" />
                </a>
              ))}
            </div>

            <div className={`p-6 rounded-xl ${
              isSaturated ? '' : 'bg-gray-800'
            }`}>
              <h4 className={`text-lg font-bold mb-3 ${
                isSaturated ? "text-crayola-white" : "text-gray-200"
              }`}>
                Collaboration Inquiries
              </h4>
              <p className={`text-sm mb-4 ${
                isSaturated ? "text-crayola-white" : "text-gray-300"
              }`}>
                Interested in working together? Whether it's custom artwork, 
                performance collaborations, or creative projects, I'm always open to new possibilities.
              </p>
              <button
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors duration-300 ${
                  isSaturated 
                    ? 'bg-crayola-white text-crayola-black hover:bg-crayola-yellow' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                Let's Talk
              </button>
            </div>
          </div>

          {/* Mailing List */}
          <div className="space-y-8">
            <h3 className={`text-2xl font-bold mb-6 ${
              isSaturated ? "text-gray-900" : "text-gray-200"
            }`}>
              Stay ArtSaturated
            </h3>
            
            <div className={`backdrop-blur-sm border rounded-xl p-8 ${
              isSaturated 
                ? 'bg-crayola-black/50 border-crayola-gray/20' 
                : 'bg-gray-800/50 border-gray-600/20'
            }`}>
              <div className="text-center mb-6">
                <Heart size={48} className={`mx-auto mb-4 ${
                  isSaturated ? "text-crayola-pink" : "text-gray-500"
                }`} />
                <h4 className={`text-xl font-bold mb-2 ${
                  isSaturated ? "text-crayola-white" : "text-gray-200"
                }`}>
                  Join the Creative Community
                </h4>
                <p className={isSaturated ? "text-crayola-gray" : "text-gray-400"}>
                  Get exclusive updates on new artwork, merch drops, and behind-the-scenes content.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                      isSaturated 
                        ? 'bg-crayola-white/10 text-crayola-white placeholder-crayola-gray border-crayola-gray/30 focus:border-crayola-yellow' 
                        : 'bg-gray-700/50 text-gray-200 placeholder-gray-500 border-gray-600/30 focus:border-gray-400'
                    }`}
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                      isSaturated 
                        ? 'bg-crayola-white/10 text-crayola-white placeholder-crayola-gray border-crayola-gray/30 focus:border-crayola-yellow' 
                        : 'bg-gray-700/50 text-gray-200 placeholder-gray-500 border-gray-600/30 focus:border-gray-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 ${
                    isSaturated 
                      ? 'text-crayola-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  Subscribe to Updates
                </button>
              </form>

              <p className={`text-xs text-center mt-4 ${
                isSaturated ? "text-crayola-gray" : "text-gray-500"
              }`}>
                No spam, just art. Unsubscribe anytime.
              </p>
            </div>

            <div className="text-center">
              <h4 className={`text-lg font-bold mb-4 ${
                isSaturated ? "text-crayola-white" : "text-gray-200"
              }`}>
                What You'll Get
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className={isSaturated ? "text-crayola-gray" : "text-gray-500"}>
                  ✨ New artwork reveals
                </div>
                <div className={isSaturated ? "text-crayola-gray" : "text-gray-500"}>
                  🎨 Behind-the-scenes
                </div>
                <div className={isSaturated ? "text-crayola-gray" : "text-gray-500"}>
                  🛍️ Merch drop alerts
                </div>
                <div className={isSaturated ? "text-crayola-gray" : "text-gray-500"}>
                  🎵 Creative inspiration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-16 pt-8 border-t ${
          isSaturated ? "border-crayola-gray/20" : "border-gray-600/20"
        }`}>
          <p className={`mb-4 ${
            isSaturated ? "text-crayola-gray" : "text-gray-500"
          }`}>
            Made with <span title="Made with love">
              <Heart size={16} className={`inline ${
                isSaturated ? "text-crayola-pink" : "text-gray-500"
              }`} />
            </span> by Zion Omari
          </p>
          <p className={`text-sm ${
            isSaturated ? "text-crayola-gray" : "text-gray-500"
          }`}>
            © 2024 ArtSaturated. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Connect 