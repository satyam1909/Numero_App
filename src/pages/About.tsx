import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const numberMeanings = [
    { number: 1, meaning: "Leadership, independence, and creativity", icon: "👑" },
    { number: 2, meaning: "Cooperation, diplomacy, and balance", icon: "🤝" },
    { number: 3, meaning: "Expression, optimism, and joy", icon: "🎨" },
    { number: 4, meaning: "Stability, hard work, and practicality", icon: "🏗️" },
    { number: 5, meaning: "Freedom, change, and adventure", icon: "🌍" },
    { number: 6, meaning: "Love, responsibility, and nurturing", icon: "💝" },
    { number: 7, meaning: "Spirituality, analysis, and wisdom", icon: "🔮" },
    { number: 8, meaning: "Power, abundance, and material success", icon: "💰" },
    { number: 9, meaning: "Compassion, humanitarianism, and universal love", icon: "❤️" },
  ];

  const numerologyTypes = [
    {
      name: "Life Path Number",
      description: "Your life's purpose and natural path",
      calculation: "Sum of birth date digits",
      icon: "🎯"
    },
    {
      name: "Personality Number", 
      description: "How others see you and your outer personality",
      calculation: "Sum of consonants in your name",
      icon: "👤"
    },
    {
      name: "Destiny Number",
      description: "Your life's purpose and the path you're meant to follow", 
      calculation: "Sum of all letters in your name",
      icon: "🌟"
    },
    {
      name: "Chaldean Number",
      description: "Ancient system using different number values for letters",
      calculation: "Ancient Babylonian numerology system",
      icon: "🏛️"
    },
    {
      name: "Soul Urge Number",
      description: "Your inner desires, motivations, and what truly makes you happy",
      calculation: "Sum of vowels in your name",
      icon: "💝"
    },
    {
      name: "Expression Number", 
      description: "Your natural talents, abilities, and how you express yourself",
      calculation: "Sum of all letters in your name",
      icon: "🎨"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            About Numerology
          </h2>
        </motion.div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-8"
        >
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="text-2xl font-bold mb-4">What is Numerology?</h3>
          <p className="text-gray-600 leading-relaxed">
            Numerology is an ancient practice that studies the mystical relationship between numbers and life events. It's based on the belief that numbers have a special significance and can influence our lives in profound ways.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8"
        >
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-4">Multiple Numbers</h3>
          <p className="text-gray-600 leading-relaxed">
            Numerology uses multiple numbers to provide a complete picture of your personality, life purpose, and potential. Each number reveals different aspects of your character and life path.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card p-8 mb-12"
      >
        <h3 className="text-3xl font-bold text-center mb-8">Types of Numerology Numbers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {numerologyTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{type.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{type.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <p className="text-xs text-gray-500 font-medium">{type.calculation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="card p-8"
      >
        <h3 className="text-3xl font-bold text-center mb-8">What Your Numbers Mean</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {numberMeanings.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 + index * 0.1 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-4xl font-bold gradient-text mb-2">{item.number}</div>
                <p className="text-gray-700 font-medium">{item.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="mt-12 card p-8 text-center"
      >
        <div className="text-4xl mb-4">💡</div>
        <h3 className="text-2xl font-bold mb-4">Remember</h3>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          While numerology can provide insights and guidance, it's important to remember that it's just one tool among many for self-discovery. Your numbers can help you understand your strengths and challenges, but it's up to you to make the most of your journey.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About; 