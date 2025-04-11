'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Crosshair, Wand2 } from 'lucide-react';
import axios from 'axios';

const ShootingGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Game state
  const targets = useRef([]);
  const shots = useRef([]);
  const animationFrameId = useRef(null);

  // Game configuration
  const TARGET_SPAWN_RATE = 0.02;
  const TARGET_SIZE = 20;

  // Initialize game
  const initGame = () => {
    targets.current = [];
    shots.current = [];
    setScore(0);
    setGameOver(false);
    startGameLoop();
  };

  // Game loop
  const startGameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw targets
      ctx.fillStyle = 'black';
      targets.current.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw shots
      ctx.fillStyle = 'gray';
      shots.current.forEach(shot => {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
      });

      // Check collisions
      shots.current.forEach((shot, sIndex) => {
        targets.current.forEach((target, tIndex) => {
          const dx = shot.x - target.x;
          const dy = shot.y - target.y;
          if (Math.sqrt(dx * dx + dy * dy) < target.size / 2) {
            targets.current.splice(tIndex, 1);
            shots.current.splice(sIndex, 1);
            setScore(prev => prev + 1);
          }
        });
      });

      // Spawn new targets
      if (Math.random() < TARGET_SPAWN_RATE) {
        targets.current.push({
          x: Math.random() * (canvas.width - TARGET_SIZE),
          y: Math.random() * (canvas.height - TARGET_SIZE),
          size: TARGET_SIZE
        });
      }

      animationFrameId.current = requestAnimationFrame(update);
    };

    update();
  };

  // Handle mouse clicks
  useEffect(() => {
    const canvas = canvasRef.current;
    
    const handleClick = (e) => {
      if (gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      shots.current.push({ x, y });
    };

    canvas.addEventListener('click', handleClick);
    return () => canvas.removeEventListener('click', handleClick);
  }, [gameOver]);

  // Initial setup
  useEffect(() => {
    setEditableCode(`
const initGame = () => {
  // Initialize game state
  targets.current = [];
  shots.current = [];
  setScore(0);
  setGameOver(false);
  startGameLoop();
};

// Customize target spawn rate
const TARGET_SPAWN_RATE = 0.02;
`);
    initGame();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Code editing and AI functions (same structure as original)
  const applyCodeChanges = () => { /* ... */ };
  const getAiSuggestion = async () => { /* ... */ };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      {/* CRT Screen Border */}
      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="max-w-6xl mx-auto bg-black border-t-8 border-l-8 border-r-8 border-b-8 border-gray-800 rounded-lg p-8 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h1 className="text-4xl font-bold text-center mb-8 text-white flex items-center justify-center gap-4">
            <Crosshair className="text-gray-500" />
            Shooting Gallery
            <Code className="text-gray-500" />
          </h1>

          <div className="flex space-x-6">
            <div className={`${showCode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/5 to-transparent pointer-events-none"></div>
                  <canvas 
                    ref={canvasRef} 
                    width={300} 
                    height={400}
                    className="border-4 bg-white border-gray-800 rounded-md shadow-[0_0_20px_rgba(0,255,0,0.2)]"
                  />
                </div>

                <div className="mt-6 bg-black border-2 border-gray-800 p-4 rounded-lg w-full max-w-xs">
                  <p className="text-2xl font-bold text-gray-500 text-center tracking-widest">
                    SCORE: {score}
                  </p>
                </div>

                <div className="mt-4 flex gap-4">
                  <button 
                    onClick={initGame}
                    className="px-6 py-2 bg-gray-900 text-gray-500 border-2 border-gray-500 rounded hover:bg-gray-800 transition-colors shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                  >
                    RESTART
                  </button>
                  
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShootingGame;