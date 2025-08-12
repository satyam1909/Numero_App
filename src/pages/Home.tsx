import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-8xl mb-4">🔮</div>
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
          Discover Your Life Path Number
        </h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
      >
        Numerology is the mystical study of numbers and their influence on our lives. Your life path number is one of the most important numbers in numerology, revealing your life's purpose and the path you're meant to follow.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <Link
          to="/calculator"
          className="btn btn-primary text-xl px-12 py-4 inline-block"
        >
          🧮 Calculate Your Number
        </Link>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card p-6"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Life Purpose</h3>
            <p className="text-gray-600">Discover your natural talents and life's calling</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="card p-6"
          >
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
            <p className="text-gray-600">Understand your strengths and areas for development</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="card p-6"
          >
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold mb-2">Ancient Wisdom</h3>
            <p className="text-gray-600">Tap into centuries of numerological knowledge</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home; 