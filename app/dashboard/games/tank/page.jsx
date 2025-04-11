'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Trophy, Crosshair, Wand2 } from 'lucide-react';
import axios from 'axios';

const canvasWidth = 800;
const canvasHeight = 400;

const TankGame = () => {
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Game state refs
  const playerTankRef = useRef({ x: 100, y: 300 });
  const aiTankRef = useRef({ x: 600, y: 300 });
  const projectilesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const aiGunAngleRef = useRef(0);
  const animationFrameId = useRef(null);

  // Game configuration
  const GUN_LENGTH = 40;
  const PROJECTILE_SPEED = 5;
  const AI_FIRE_INTERVAL = 2000;
  const MAX_SCORE = 3;

  // Calculate angle between two points
  const calculateAngle = (x1, y1, x2, y2) => {
    return Math.atan2(y2 - y1, x2 - x1);
  };

  // Initialize game
  const initGame = () => {
    projectilesRef.current = [];
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner('');
    startGameLoop();
    startAiBehavior();
  };

  // Game loop
  const startGameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawTank = (x, y, angle, isAi = false) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Tank body
      ctx.fillStyle = isAi ? 'red' : 'green';
      ctx.fillRect(-20, -10, 40, 20);
      
      // Tank gun
      ctx.rotate(angle);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, -3, GUN_LENGTH, 6);
      
      ctx.restore();
    };

    const update = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update projectiles
      projectilesRef.current = projectilesRef.current.filter(p => {
        p.x += Math.cos(p.angle) * PROJECTILE_SPEED;
        p.y += Math.sin(p.angle) * PROJECTILE_SPEED;
        return p.x > 0 && p.x < canvas.width && p.y > 0 && p.y < canvas.height;
      });

      // Check collisions
      projectilesRef.current.forEach((projectile, index) => {
        // Check AI tank hit
        if (!projectile.isAi && Math.hypot(
          projectile.x - aiTankRef.current.x,
          projectile.y - aiTankRef.current.y
        ) < 20) {
          setPlayerScore(prev => prev + 1);
          projectilesRef.current.splice(index, 1);
        }

        // Check Player tank hit
        if (projectile.isAi && Math.hypot(
          projectile.x - playerTankRef.current.x,
          projectile.y - playerTankRef.current.y
        ) < 20) {
          setAiScore(prev => prev + 1);
          projectilesRef.current.splice(index, 1);
        }
      });

      // Check win condition
      if (playerScore >= MAX_SCORE || aiScore >= MAX_SCORE) {
        setGameOver(true);
        setWinner(playerScore >= MAX_SCORE ? 'Player' : 'AI');
        return;
      }

      // Draw elements
      drawTank(playerTankRef.current.x, playerTankRef.current.y, 
        calculateAngle(playerTankRef.current.x, playerTankRef.current.y, 
        mousePosRef.current.x, mousePosRef.current.y));
      
      drawTank(aiTankRef.current.x, aiTankRef.current.y, 
        aiGunAngleRef.current, true);

      projectilesRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.isAi ? 'red' : 'green';
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(update);
    };

    update();
  };

  // AI behavior
  const startAiBehavior = () => {
    const aiInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(aiInterval);
        return;
      }

      // Simple AI aiming logic
      const targetAngle = calculateAngle(
        aiTankRef.current.x,
        aiTankRef.current.y,
        playerTankRef.current.x,
        playerTankRef.current.y
      );
      
      // Fire projectile
      projectilesRef.current.push({
        x: aiTankRef.current.x,
        y: aiTankRef.current.y,
        angle: targetAngle,
        isAi: true
      });
    }, AI_FIRE_INTERVAL);

    // Rotate AI gun
    const aiRotationInterval = setInterval(() => {
      aiGunAngleRef.current += 0.02;
      if (aiGunAngleRef.current > Math.PI) aiGunAngleRef.current = 0;
    }, 50);

    return () => {
      clearInterval(aiInterval);
      clearInterval(aiRotationInterval);
    };
  };

  // Handle mouse input
  useEffect(() => {
    const canvas = canvasRef.current;
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleClick = () => {
      if (gameOver) return;
      
      const angle = calculateAngle(
        playerTankRef.current.x,
        playerTankRef.current.y,
        mousePosRef.current.x,
        mousePosRef.current.y
      );

      projectilesRef.current.push({
        x: playerTankRef.current.x,
        y: playerTankRef.current.y,
        angle: angle,
        isAi: false
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [gameOver]);

  // Initial setup
  useEffect(() => {
    setEditableCode(`
const GUN_LENGTH = 40;
const PROJECTILE_SPEED = 5;
const AI_FIRE_INTERVAL = 2000;
const MAX_SCORE = 3;

const calculateAngle = (x1, y1, x2, y2) => {
  return Math.atan2(y2 - y1, x2 - x1);
};
    `);

    initGame();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Code application and AI functions (similar to previous implementations)
  const applyCodeChanges = () => { /* ... */ };
  const getAiSuggestion = async () => { /* ... */ };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
         <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-20">
        
      <div className="max-w-6xl mx-auto bg-black border-t-8 border-l-8 border-r-8 border-b-8 border-gray-800 rounded-lg p-8 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-4">
            <Trophy className="text-yellow-400" />
            Tank Battle
            <Crosshair className="text-green-400" />
          </h1>

          <div className="flex space-x-6">
            <div className={`${showCode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
              <div className="flex flex-col items-center">
                <canvas 
                  ref={canvasRef} 
                  width={canvasWidth}
                  height={canvasHeight}
                  className="border-4 border-gray-800 bg-gray-900 rounded-md"
                />

                <div className="mt-6 w-full max-w-xl flex justify-between">
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                    <h2 className="text-2xl font-bold text-green-400">PLAYER</h2>
                    <p className="text-4xl">{playerScore}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                    <h2 className="text-2xl font-bold text-red-400">AI</h2>
                    <p className="text-4xl">{aiScore}</p>
                  </div>
                </div>

                {gameOver && (
                  <div className="mt-4 text-3xl font-bold text-yellow-400">
                    {winner} WINS!
                  </div>
                )}

                <div className="mt-4 flex gap-4">
                  <button 
                    onClick={initGame}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    NEW GAME
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

export default TankGame;