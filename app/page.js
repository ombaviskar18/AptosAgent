'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const VintageGamesLanding = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);

  const gameLibrary = [
    {
      id: 'ai-generation',
      title: 'AI MiniGame Generator',
      description: 'Autonomous minigame creation system',
      difficulty: 'Advanced',
      creator: 'AptosMiniHub Team',
      color: 'bg-purple-900',
      textColor: 'text-purple-300',
      fullDescription: 'Our proprietary AI engine generates unique minigames using neural networks trained on decades of gaming data. It combines procedural content generation with player preference analysis to create endlessly engaging experiences.',
      mechanics: [
        'Neural network architecture',
        'Procedural content generation',
        'Player behavior analysis',
        'Auto-balancing mechanics'
      ]
    },
    {
      "id": "security",
      "title": "Aptos AI Agent",
      "description": "Next-Gen Compliance System with Move Agent Integration",
      "difficulty": "Advanced",
      "creator": "AptosMiniHub Team",
      "color": "bg-teal-900",
      "textColor": "text-teal-300",
      "fullDescription": "An advanced security suite powered by the Move Agent Kit, seamlessly integrated with the Aptos network. This system leverages AI to monitor transactions and gameplay in real-time, ensuring compliance and security.",
      "mechanics": [
        "Anomaly detection",
        "Behavioral biometrics",
        "Smart contract auditing",
        "Compliance automation"
      ]
    }, 
    {
      id: 'dev-tools',
      title: 'Create Unique Games',
      description: 'No-code development platform',
      difficulty: 'Medium',
      creator: 'AptosMiniHub Team',
      color: 'bg-indigo-900',
      textColor: 'text-blue-300',
      fullDescription: 'Full-stack development environment with drag-and-drop interface and smart contracts integration. Includes testing sandbox, asset library, and one-click deployment to Aptos blockchain.',
      mechanics: [
        'Visual scripting system',
        'Smart contract templates',
        'Real-time collaboration',
        'APIs/SDK integration'
      ]
    },
    {
      id: 'token-system',
      title: 'Tokenization and Monetization',
      description: 'Tokenize the minigames for stakeholders',
      difficulty: 'Expert',
      era:'Upcoming!', 
      creator: 'AptosMiniHub Team',
      color: 'bg-blue-900',
      textColor: 'text-indigo-300',
      fullDescription: 'Implement systems that allow users to tokenize their minigames, facilitating co-ownership and revenue-sharing models.',
      mechanics: [
        'APTOS integration',
        'Co-creation rewards',
        'Liquidity pools',
        'DAO governance'
      ]
    },
    {
      id: 'leaderboards',
      title: 'Leaderboard Rankings',
      description: 'Real-time competitive system',
      difficulty: 'Medium',
      era:'Upcoming!', 
      creator: 'AptosMiniHub Team',
      color: 'bg-orange-900',
      textColor: 'text-orange-300',
      fullDescription: 'Adaptive leaderboard system with seasonal competitions and skill-based matchmaking. Features cross-game rankings and NFT-based achievements.',
      mechanics: [
        'ELO rating system',
        'Seasonal rewards',
        'NFT trophies',
        'Social sharing'
      ]
    },
    {
      "id": "telegram_minigames_generator",
      "title": "Telegram Minigames Generator",
      "description": "Creating and deploying mini-games on Telegram",
      "difficulty": "Expert",
      "era": "Upcoming!",
      "creator": "Your Development Team",
      "color": "bg-blue-900",
      "textColor": "text-blue-300",
      "fullDescription": "An advanced AI agent that enables users to generate, customize, and deploy interactive mini-games within Telegram. Features include AI-assisted game design, integration with Telegram's gaming platform, and real-time analytics.",
      "mechanics": [
        "AI-assisted game design",
        "Seamless integration with Telegram's gaming platform",
        "Real-time analytics and user engagement tracking",
        "Customizable game templates",
        "Multiplayer support"
      ]
    }
    
  ];

  const gameCollections = [ 
    {
      id: 'Cartoon',
      title: 'NFT Cards Battle',
      description: 'The ultimate collection of all cartoon cards for fighting in Royal Nft battle ',
      games: ['Wild card Fighting', 'Royal Battle', 'Power Cards'],
      image: '/cat.png'
    },
    {
      id: 'Monkey',
      title: 'Nft trading and Minting using Ai',
      description: 'Iconic games that defined nft minting',
      games: ['Nfts', 'Meme', 'Tokens'],
      image: '/monkey.png'
    },
    {
      id: 'handheld',
      title: 'Nft Betting games ',
      description: 'Top Nft games for PVP',
      games: ['Trade wars', 'Token Battle', 'Nft Robot fight'],
      image: '/game.jpg'  
    }
  ];

  return (
    <div className="bg-black text-white font-mono">
      {/* Scanline and Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4 py-24">
        <div className="max-w-4xl">
      <Image src="/pc.gif" alt="Logo" className='ml-80' width={202} height={202} />
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-wider uppercase"
          >
            Aptos MiniGames Launchpad <span className="text-gray-500 animate-in">By Agent</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Launch, Play, Innovate: AI Minigames on Aptos using Aptos MiniHub  
          </motion.p>
          <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-black px-10 py-4 text-xl font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all"
          >
            Explore MiniGames
          </motion.button>
          </Link>
        </div>
      </div>

      {/* Game Library Section */}
<section className="container mx-auto px-4 py-24">
  <h2 className="text-5xl text-center mb-16 font-bold">Core Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {gameLibrary.map((game) => (
      <motion.div
        key={game.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          ${game.color} 
          ${activeGame === game.id ? 'scale-105' : ''}
          border-4 border-white/10 
          p-6 rounded-xl 
          transform transition-all duration-300 
          hover:border-white/30 
          cursor-pointer
          h-full
        `}
        onClick={() => setActiveGame(game.id === activeGame ? null : game.id)}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-3xl font-bold ${game.textColor}`}>
            {game.title}
          </h3>
          <span className="text-xl text-gray-400">{game.era}</span>
        </div>
        <p className="text-gray-300 mb-4">{game.description}</p>
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 bg-black/30 rounded">
            Complexity: {game.difficulty}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
          >
            Details
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Expanded Game Details */}
  {activeGame && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="mt-12 bg-gray-900 p-8 rounded-xl"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-4xl font-bold mb-4">
            {gameLibrary.find(g => g.id === activeGame).title}
          </h4>
          <p className="text-gray-300 mb-4">
            {gameLibrary.find(g => g.id === activeGame).fullDescription}
          </p>
          <div>
            <h5 className="text-2xl mb-2">Key Components</h5>
            <ul className="list-disc pl-5 text-gray-400">
              {gameLibrary.find(g => g.id === activeGame).mechanics.map((mechanic, index) => (
                <li key={index}>{mechanic}</li>
              ))}
            </ul>
          </div>
        </div>  
        <div>
          <h5 className="text-2xl mb-4">Technical Specifications</h5>
          <div className="bg-black/30 p-4 rounded">
            <p>Developer: {gameLibrary.find(g => g.id === activeGame).creator}</p>
            <p>Blockchain: Aptos Network</p>
            <p>AI Model: GPT-4 Turbo</p>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</section>

      {/* Game Collections Section */}
      <section className="container mx-auto px-4 py-24 bg-gray-900">
        <h2 className="text-5xl text-center mb-16 font-bold">Upcoming! Nft Games 🚀</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {gameCollections.map((collection) => (
            <motion.div
              key={collection.id}
              whileHover={{ scale: 1.05 }}
              className={`
                bg-black border-4 border-gray-800 rounded-xl overflow-hidden
                ${activeCollection === collection.id ? 'border-white' : ''}
              `}
              onClick={() => setActiveCollection(
                collection.id === activeCollection ? null : collection.id
              )}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">{collection.title}</h3>
                <p className="text-gray-400 mb-4">{collection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {collection.games.map((game) => (
                    <span 
                      key={game} 
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preservation Mission Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-5xl font-bold mb-12">Our Mission</h2>
        <div className="max-w-4xl mx-auto">
        <p className="text-xl text-gray-400 mb-8">
          At Aptos Minihub, we empower users to become creators, enabling them to generate unique minigames using AI agents. Our platform fosters creativity and rewards engagement, allowing users to play and earn points within the vibrant Aptos ecosystem.
        </p>

          <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-black px-10 py-4 text-xl font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all"
          >
           Become a Creator 😎
          </motion.button>
          </Link>
        </div>
      </section>

     
    </div>
  );
};

export default VintageGamesLanding;