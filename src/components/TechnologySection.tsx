import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Eye, Zap, Layers, Palette } from 'lucide-react';

const TechnologySection: React.FC = () => {
  const technologies = [
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      description: 'Neural networks that learn from viewer interactions to create personalized art experiences.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Real-time emotion detection and gesture recognition for truly interactive experiences.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Cpu,
      title: 'Real-time Rendering',
      description: 'Advanced GPU computing enables instant visual transformations and complex simulations.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'IoT Sensors',
      description: 'Environmental sensors capture movement, sound, and biometric data for responsive art.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Layers,
      title: 'AR/VR Integration',
      description: 'Immersive technologies blend digital art with physical spaces seamlessly.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Palette,
      title: 'Generative Algorithms',
      description: 'Procedural content generation creates infinite variations of artistic expressions.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Powered by <span className="text-primary-600">Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge technology stack enables unprecedented levels of interactivity 
            and personalization in digital art experiences.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="card p-8 h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tech.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {tech.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {tech.description}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 h-1 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-primary-400 transition-colors duration-300 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-white">
            <h3 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Experience the Future of Art
            </h3>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join us in exploring the intersection of technology and creativity. 
              Witness how AI, sensors, and real-time computing transform art into living experiences.
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Learn More About Our Tech
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;