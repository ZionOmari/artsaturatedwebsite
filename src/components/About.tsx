import { Music, Palette, Zap } from 'lucide-react'

interface AboutProps {
  isSaturated?: boolean
}

const About = ({ isSaturated = false }: AboutProps) => {
  const features = [
    {
      icon: <Music size={32} />,
      title: "Crayon-Stained Soundscapes",
      description: "Where every beat is a brushstroke, every melody a color, and every rhythm tells a story of movement and emotion."
    },
    {
      icon: <Palette size={32} />,
      title: "From Movement to Medium",
      description: "Transforming the energy of dance into visual art, creating pieces that capture the essence of motion and passion."
    },
    {
      icon: <Zap size={32} />,
      title: "Creative Engineering",
      description: "Building bridges between different art forms, engineering experiences that resonate with the soul and inspire action."
    }
  ]

  return (
    <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isSaturated ? 'crayola-gradient' : 'muted-gradient'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={isSaturated ? "gradient-text" : "text-gray-300"}>From Movement</span>
            <br />
            <span className={isSaturated ? "text-gray-900" : "text-gray-200"}>to Medium</span>
          </h2>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isSaturated ? "text-gray-700" : "text-gray-400"
          }`}>
            I'm Zion Omari, a creative engineer who believes that art isn't just something you look at—it's something you feel, 
            something you move to, something that moves you.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`p-8 md:p-12 rounded-2xl mb-16 text-center ${
          'bg-transparent'
        }`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
            isSaturated ? "text-crayola-white" : "text-gray-200"
          }`}>
            The Manifesto
          </h3>
          <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${
            isSaturated ? "text-crayola-white" : "text-gray-300"
          }`}>
            "I create because I must. I move because I can. I share because I believe that art has the power to transform 
            not just the creator, but everyone who encounters it. Every piece I make is a conversation between movement 
            and medium, between sound and sight, between the artist and the audience. This is ArtSaturated—where passion 
            meets purpose, where creativity knows no bounds, and where every creation is an invitation to experience 
            the world through a lens of vibrant possibility."
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                isSaturated 
                                  ? 'bg-transparent border-crayola-gray/20 hover:border-crayola-yellow/50'
                : 'bg-transparent border-gray-600/20 hover:border-gray-500/50'
              }`}
            >
              <div className={`mb-4 flex justify-center ${
                isSaturated ? "text-crayola-yellow" : "text-gray-400"
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isSaturated ? "text-gray-900" : "text-gray-200"
              }`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${
                isSaturated ? "text-gray-700" : "text-gray-400"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Personal Story */}
        <div className="mt-16 text-center">
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
            isSaturated ? "text-gray-900" : "text-gray-200"
          }`}>
            The Journey
          </h3>
          <div className={`max-w-4xl mx-auto text-lg leading-relaxed space-y-4 ${
            isSaturated ? "text-gray-700" : "text-gray-400"
          }`}>
            <p>
              My path began with movement—dance was my first language, my first way of expressing what words couldn't capture. 
              But as I moved, I realized that every gesture, every rhythm, every emotion could be translated into other forms.
            </p>
            <p>
              That's when I discovered the power of creative engineering. I started seeing connections between the flow of dance 
              and the flow of music, between the energy of movement and the energy of visual art. I began creating pieces that 
              weren't just seen or heard, but felt.
            </p>
            <p>
              ArtSaturated is the culmination of this journey—a space where all these elements come together, where every creation 
              is an invitation to experience the world through a lens of vibrant possibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 