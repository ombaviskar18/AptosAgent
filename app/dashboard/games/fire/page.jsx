'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Rocket, Skull, Wand2 } from 'lucide-react';
import axios from 'axios';

const canvasWidth = 300;
const canvasHeight = 400;

const SpaceShooter = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Game state refs
  const kingRef = useRef({ x: 0, y: 0, width: 30, height: 30 });
  const bulletsRef = useRef([]);
  const enemiesRef = useRef([]);
  const animationFrameId = useRef(null);
  const gameOverRef = useRef(false);

  // Game configuration
  const ENEMY_SPAWN_RATE = 0.02;
  const MOVE_SPEED = 10;
  const BULLET_SPEED = 5;

  // Initialize game
  const initGame = () => {
    const canvas = canvasRef.current;
    kingRef.current = {
      x: canvas.width / 2 - 15,
      y: canvas.height - 50,
      width: 30,
      height: 30
    };
    bulletsRef.current = [];
    enemiesRef.current = [];
    gameOverRef.current = false;
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

      if (gameOverRef.current) {
        // Draw game over state
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(kingRef.current.x + 15, kingRef.current.y);
        ctx.lineTo(kingRef.current.x, kingRef.current.y + 30);
        ctx.lineTo(kingRef.current.x + 30, kingRef.current.y + 30);
        ctx.closePath();
        ctx.fill();
        
        enemiesRef.current.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, 30, 30));
        bulletsRef.current.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, 5, 10));
        return;
      }

      // Update positions
      bulletsRef.current = bulletsRef.current.filter(bullet => bullet.y > 0);
      bulletsRef.current.forEach(bullet => (bullet.y -= BULLET_SPEED));
      enemiesRef.current.forEach(enemy => (enemy.y += 2));

      // Check collisions
      bulletsRef.current.forEach((bullet, bIndex) => {
        enemiesRef.current.forEach((enemy, eIndex) => {
          if (bullet.x < enemy.x + 30 && bullet.x + 5 > enemy.x &&
              bullet.y < enemy.y + 30 && bullet.y + 10 > enemy.y) {
            bulletsRef.current.splice(bIndex, 1);
            enemiesRef.current.splice(eIndex, 1);
            setScore(prev => prev + 1);
          }
        });
      });

      // Check player collision
      enemiesRef.current.forEach((enemy) => {
        if (enemy.x < kingRef.current.x + 30 &&
            enemy.x + 30 > kingRef.current.x &&
            enemy.y < kingRef.current.y + 30 &&
            enemy.y + 30 > kingRef.current.y) {
          gameOverRef.current = true;
          setGameOver(true);
        }
      });

      // Spawn enemies
      if (Math.random() < ENEMY_SPAWN_RATE) {
        enemiesRef.current.push({
          x: Math.random() * (canvas.width - 30),
          y: 0
        });
      }

      // Draw elements
      ctx.fillStyle = 'black';
      ctx.fillRect(kingRef.current.x, kingRef.current.y, 30, 30);
      
      bulletsRef.current.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
      });

      enemiesRef.current.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, 30, 30);
      });

      animationFrameId.current = requestAnimationFrame(update);
    };

    update();
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const king = kingRef.current;
      switch(e.key) {
        case 'ArrowLeft':
          king.x = Math.max(0, king.x - MOVE_SPEED);
          break;
        case 'ArrowRight':
          king.x = Math.min(canvasRef.current.width - 30, king.x + MOVE_SPEED);
          break;
        case ' ':
          bulletsRef.current.push({
            x: king.x + 12.5,
            y: king.y
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // Initial setup
  useEffect(() => {
    setEditableCode(`
const initGame = () => {
  const canvas = canvasRef.current;
  kingRef.current = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 30,
    height: 30
  };
  bulletsRef.current = [];
  enemiesRef.current = [];
  setScore(0);
  setGameOver(false);
  startGameLoop();
};

const ENEMY_SPAWN_RATE = 0.02;
const MOVE_SPEED = 10;
const BULLET_SPEED = 5;
    `);

    initGame();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  const applyCodeChanges = () => { /* Existing code */ };
  const getAiSuggestion = async () => { /* Existing code */ };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="max-w-6xl mx-auto bg-black border-t-8 border-l-8 border-r-8 border-b-8 border-gray-800 rounded-lg p-8 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h1 className="text-4xl font-bold text-center mb-8 text-white flex items-center justify-center gap-4">
            <Rocket className="text-red-500" />
            Space Shooter
            <Skull className="text-blue-500" />
          </h1>

          <div className="flex space-x-6">
            <div className={`${showCode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
              <div className="flex flex-col items-center">
                <div className="relative w-fit mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/5 to-transparent pointer-events-none"></div>
                  <canvas 
                    ref={canvasRef} 
                    width={canvasWidth}
                    height={canvasHeight}
                    className="border-4 bg-white border-gray-800 rounded-md shadow-[0_0_20px_rgba(0,255,0,0.2)] mx-auto"
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

export default SpaceShooter;