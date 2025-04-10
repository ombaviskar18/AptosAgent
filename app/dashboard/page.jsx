'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Dashboard = () => {
  return (
    <div className="bg-black text-white font-mono min-h-screen">
      {/* Scanline and Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Image 
            src="/play.gif" 
            alt="Play" 
            width={200}
            height={200}
            className="rounded-lg shadow-lg  transition-shadow duration-300"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-6xl font-bold mb-6 tracking-wider uppercase text-center"
        >
          Aptos MiniGames <span className="text-gray-500 animate-in">By Agent</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto text-center"
        >
          Welcome to the minigames dashboard where you can explore and play ai agent minigames and create your own minigame using prompt .
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          
          {/* Foru Card */}
          <Link href="dashboard/games/connectfour">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/four.png" alt="Memory" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Connect Four AI</h2>
              <p className="text-gray-300 font-retro">Drop coins into the grid and try to beat AI in a four-in-a-row match.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

            {/* REaction Card */}
            <Link href="dashboard/games/reaction">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/reaction.png" alt="Memory" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Reaction Duel</h2>
              <p className="text-gray-300 font-retro">Test your reflexes against the AI — who can click the fastest when the screen flashes?</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>
         
          
         

           {/* Chess Card */}
           <Link href="dashboard/games/chess">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/chess.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">AI Chess Blitz</h2>
              <p className="text-gray-300 font-retro"> A speed version of chess where you have seconds per move against an adaptive AI.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

           {/* Maze Card */}
           <Link href="dashboard/games/maze">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/maze.png" alt="maze" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Maze Escape</h2>
              <p className="text-gray-300 font-retro">Race against an AI to exit a randomly generated maze first.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

        
           {/* Memory Card */}
           <Link href="dashboard/games/memory">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/memory.png" alt="Memory" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Memory Match</h2>
              <p className="text-gray-300 font-retro">Flip and match cards faster than the AI using memory skills.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

             {/* TTT Card */}
           <Link href="dashboard/games/ttt">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/tic.png" alt="Memory" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Tic Tac Toe</h2>
              <p className="text-gray-300 font-retro">Cahllenge Tic Tac toe play with ai and win it.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

               {/* Hangman Card */}
          <Link href="dashboard/games/hang">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/hang.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Hangman challenge</h2>
              <p className="text-gray-300 font-retro">Guess the word before the stick figure is complete — AI picks tricky ones.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>
           
           
            {/* Tank Card */}
            <Link href="dashboard/games/tank">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/tank.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Tank fire Game</h2>
              <p className="text-gray-300 font-retro">Aim to Ai tank then fire to tank and win againt Ai</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>
          


           {/* Shooting Card */}
           <Link href="dashboard/games/shoot">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/shoot.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Color shooting</h2>
              <p className="text-gray-300 font-retro">Shoot the black color spot created by agent and earn maximum points by shoot it.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

          {/* Fire Card */}
          <Link href="dashboard/games/fire">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/space.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Object Fire </h2>
              <p className="text-gray-300 font-retro">Aim the coming object and fire it and earn points</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>

           {/* Snake Card */}
           <Link href="dashboard/games/snake">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/snake.png" alt="Snake" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Snake</h2>
              <p className="text-gray-300 font-retro">Navigate the snake to eat food and grow longer without hitting the walls.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>


          {/* Tetris Card */}
          <Link href="dashboard/games/tetris">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/tetris.png" alt="Tetris" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Tetris</h2>
              <p className="text-gray-300 font-retro">Stack the falling blocks to create complete lines and score points.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>
          
          

          {/* Pingpong Card */}
          <Link href="dashboard/games/pingpong">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <img src="/pingpong.png" alt="Pingpong" className="w-full h-48 object-cover rounded-t-lg mb-4 pixel-art" />
              <h2 className="text-2xl font-semibold mb-4 text-white font-retro">Pingpong</h2>
              <p className="text-gray-300 font-retro">Play a classic game of Pingpong and challenge your reflexes against AI.</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>


          {/* Create New Game Card */}
          <Link href="/dashboard/games/html">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="text-6xl text-gray-400 font-retro mt-32">+</div>
              <p className="text-gray-300 mt-2 ml-2 font-retro mb-32">Create a new game</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;