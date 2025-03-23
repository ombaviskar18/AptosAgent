'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Telegram = () => {
  return (
    <section className="py-10 bg-black">
      <div className="container mx-auto text-center">
        {/* Trophy Image with subtle animation */}
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Image 
            src="/tropy.gif" 
            alt="Trophy" 
            width={200}
            height={200}
            className="rounded-lg shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/80 transition-shadow duration-300"
          />
        </motion.div>

        <h2 className="text-4xl font-bold text-gray-200 mb-4">
          This Feature is Coming Soon!
        </h2>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Upcoming Aptos MiniHub Realtime LeaderBoard ranking for all creators. 
          Track your progress, compete with others, and climb to the top!
        </p>

        {/* Leaderboard Image with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <Image 
            src="/teleg.jpeg" 
            alt="Leaderboard Preview" 
            width={900}
            height={400}
            className="rounded-xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 mb-24"
            style={{ 
              border: '2px solid rgba(168, 85, 247, 0.3)',
              backdropFilter: 'blur(12px)'
            }}
          />
        </motion.div>
        <Link href="https://t.me/AptosMinigamesBot">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white shadow-lg shadow-blue-400/50 hover:shadow-blue-400/80 text-black px-7 py-3 text-xl font-bold rounded-lg transition-all"
          >
           AptosMiniHub Bot 🤖 
          </motion.button>
          </Link>
      </div>
    </section>
  );
};

export default Telegram;