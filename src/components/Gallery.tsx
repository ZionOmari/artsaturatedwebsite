import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

const Gallery = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const tracks = [
    {
      title: "Crayon-Stained Soundscape #1",
      description: "A journey through color and rhythm",
      duration: "3:45",
      audioUrl: "#"
    },
    {
      title: "Movement in Medium",
      description: "Where dance meets digital",
      duration: "4:20",
      audioUrl: "#"
    },
    {
      title: "Creative Engineering Suite",
      description: "Building bridges between art forms",
      duration: "5:15",
      audioUrl: "#"
    }
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Crayon-Stained</span>
            <br />
            <span className="text-gray-900">Soundscapes</span>
          </h2>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
            Listen to the rhythm of creation, where every beat tells a story of movement and emotion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-crayola-pink/10 to-crayola-blue/10 rounded-2xl p-6 backdrop-blur-sm border border-crayola-gray/20 hover:border-crayola-yellow/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-crayola-white">
                  {track.title}
                </h3>
                <span className="text-crayola-gray text-sm">
                  {track.duration}
                </span>
              </div>
              
              <p className="text-crayola-white mb-6">
                {track.description}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="bg-crayola-yellow text-crayola-black px-4 py-2 rounded-full hover:bg-crayola-yellow/80 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-crayola-white hover:text-crayola-yellow transition-colors duration-200"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-crayola-pink/20 to-crayola-blue/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-crayola-white">
              Visual Gallery Coming Soon
            </h3>
            <p className="text-crayola-white">
              A collection of visual pieces that capture the essence of movement and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 