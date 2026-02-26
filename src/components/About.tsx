import React from 'react'

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">From Movement</span>
            <br />
            <span className="text-gray-900">to Medium</span>
          </h2>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
            Every piece tells a story of transformation, where raw emotion meets refined technique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-crayola-white">
              The Creative Process
            </h3>
            
            <p className="text-lg mb-6 text-crayola-white">
              My work begins with movement - the physical act of creation that translates 
              into visual and auditory experiences. Each piece is a journey from concept 
              to completion, capturing the energy of the moment.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-crayola-yellow rounded-full"></div>
                <span className="text-gray-900">Movement-based inspiration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-crayola-yellow rounded-full"></div>
                <span className="text-gray-200">Multi-medium exploration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-crayola-yellow rounded-full"></div>
                <span className="text-gray-400">Emotional storytelling</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-crayola-pink/20 to-crayola-blue/20 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-4 text-gray-900">
                Current Focus
              </h4>
              <p className="text-gray-700">
                Exploring the intersection of digital art and physical movement, 
                creating immersive experiences that challenge perception and 
                invite deeper connection with the creative process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 