'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Trophy, Crosshair, Wand2 } from 'lucide-react';
import axios from 'axios';

const canvasSize = 600;
const cellSize = 30;

const MazeGame = () => {
  const canvasRef = useRef(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Game state refs
  const playerPos = useRef({ x: 1, y: 1 });
  const aiPos = useRef({ x: 1, y: 1 });
  const maze = useRef([]);
  const aiPath = useRef([]);
  const animationFrameId = useRef(null);

  // Game configuration
  const MAZE_WIDTH = Math.floor(canvasSize / cellSize);
  const MAZE_HEIGHT = Math.floor(canvasSize / cellSize);
  const MOVE_SPEED = 5;
  const MAX_WINS = 3;

  // Maze generation algorithm
  const generateMaze = () => {
    const grid = Array(MAZE_HEIGHT).fill().map(() => 
      Array(MAZE_WIDTH).fill().map(() => ({
        top: true,
        right: true,
        bottom: true,
        left: true,
        visited: false
      }))
    );

    const carvePath = (x, y) => {
      const directions = [
        [0, -1, 'top', 'bottom'],
        [1, 0, 'right', 'left'],
        [0, 1, 'bottom', 'top'],
        [-1, 0, 'left', 'right']
      ];

      grid[y][x].visited = true;
      directions.sort(() => Math.random() - 0.5);

      for (const [dx, dy, wall, oppositeWall] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < MAZE_WIDTH && ny >= 0 && ny < MAZE_HEIGHT && !grid[ny][nx].visited) {
          grid[y][x][wall] = false;
          grid[ny][nx][oppositeWall] = false;
          carvePath(nx, ny);
        }
      }
    };

    carvePath(0, 0);
    return grid;
  };

  // BFS pathfinding for AI
  const findPath = (start, end) => {
    const queue = [[start.x, start.y, []]];
    const visited = new Set();

    while (queue.length > 0) {
      const [x, y, path] = queue.shift();
      if (x === end.x && y === end.y) return [...path, [x, y]];

      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const neighbors = [];
      if (!maze.current[y][x].top) neighbors.push([x, y - 1]);
      if (!maze.current[y][x].right) neighbors.push([x + 1, y]);
      if (!maze.current[y][x].bottom) neighbors.push([x, y + 1]);
      if (!maze.current[y][x].left) neighbors.push([x - 1, y]);

      for (const [nx, ny] of neighbors) {
        queue.push([nx, ny, [...path, [x, y]]]);
      }
    }
    return [];
  };

  // Initialize game
  const initGame = () => {
    maze.current = generateMaze();
    playerPos.current = { x: 1, y: 1 };
    aiPos.current = { x: MAZE_WIDTH - 2, y: MAZE_HEIGHT - 2 };
    aiPath.current = findPath(aiPos.current, { x: MAZE_WIDTH - 2, y: 1 });
    setGameOver(false);
    setWinner('');
    startGameLoop();
  };

  // Game loop
  const startGameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawMaze = () => {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;

      maze.current.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.top) {
            ctx.beginPath();
            ctx.moveTo(x * cellSize, y * cellSize);
            ctx.lineTo((x + 1) * cellSize, y * cellSize);
            ctx.stroke();
          }
          if (cell.left) {
            ctx.beginPath();
            ctx.moveTo(x * cellSize, y * cellSize);
            ctx.lineTo(x * cellSize, (y + 1) * cellSize);
            ctx.stroke();
          }
        });
      });
    };

    const update = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMaze();

      // Draw exit
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect((MAZE_WIDTH - 2) * cellSize + 2, 2, cellSize - 4, cellSize - 4);

      // Draw player
      ctx.fillStyle = '#2196F3';
      ctx.beginPath();
      ctx.arc(
        playerPos.current.x * cellSize + cellSize/2,
        playerPos.current.y * cellSize + cellSize/2,
        cellSize/3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw AI
      ctx.fillStyle = '#FF5722';
      ctx.beginPath();
      ctx.arc(
        aiPos.current.x * cellSize + cellSize/2,
        aiPos.current.y * cellSize + cellSize/2,
        cellSize/3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Check wins
      if (playerPos.current.x === MAZE_WIDTH - 2 && playerPos.current.y === 1) {
        setPlayerWins(p => p + 1);
        setWinner('Player');
        setGameOver(true);
      }

      if (aiPos.current.x === MAZE_WIDTH - 2 && aiPos.current.y === 1) {
        setAiWins(a => a + 1);
        setWinner('AI');
        setGameOver(true);
      }

      animationFrameId.current = requestAnimationFrame(update);
    };

    update();
  };

  // Handle player input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      const moves = {
        ArrowUp: { dx: 0, dy: -1, wall: 'top' },
        ArrowDown: { dx: 0, dy: 1, wall: 'bottom' },
        ArrowLeft: { dx: -1, dy: 0, wall: 'left' },
        ArrowRight: { dx: 1, dy: 0, wall: 'right' },
      };

      const key = e.key in moves ? e.key : 
        { w: 'ArrowUp', s: 'ArrowDown', a: 'ArrowLeft', d: 'ArrowRight' }[e.key.toLowerCase()];

      const move = moves[key];
      if (!move) return;

      const newX = playerPos.current.x + move.dx;
      const newY = playerPos.current.y + move.dy;
      
      if (!maze.current[playerPos.current.y][playerPos.current.x][move.wall]) {
        playerPos.current = { x: newX, y: newY };
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  // AI movement
  useEffect(() => {
    if (gameOver || !aiPath.current.length) return;

    const interval = setInterval(() => {
      if (aiPath.current.length > 0) {
        const [nextX, nextY] = aiPath.current.shift();
        aiPos.current = { x: nextX, y: nextY };
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Initial setup
  useEffect(() => {
    setEditableCode(`
const cellSize = 30;
const MOVE_SPEED = 5;
const MAX_WINS = 3;
const MAZE_WIDTH = ${MAZE_WIDTH};
const MAZE_HEIGHT = ${MAZE_HEIGHT};
    `);

    initGame();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Rest of the UI components remain similar to previous example
  // (Code editor panel, AI suggestions, etc.)

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
            Maze Escape
            <Crosshair className="text-green-400" />
          </h1>

          <div className="flex space-x-6">
            <div className={`${showCode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
              <div className="flex flex-col items-center">
                <canvas 
                  ref={canvasRef} 
                  width={canvasSize}
                  height={canvasSize}
                  className="border-4 border-gray-800 bg-gray-900 rounded-md"
                />

                <div className="mt-6 w-full max-w-xl flex justify-between">
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                    <h2 className="text-2xl font-bold text-blue-400">PLAYER</h2>
                    <p className="text-4xl">{playerWins}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                    <h2 className="text-2xl font-bold text-orange-400">AI</h2>
                    <p className="text-4xl">{aiWins}</p>
                  </div>
                </div>

                {gameOver && (
                  <div className="mt-4 text-3xl font-bold text-yellow-400">
                    {winner} ESCAPED FIRST!
                  </div>
                )}

                <div className="mt-4 flex gap-4">
                  <button 
                    onClick={initGame}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    NEW MAZE
                  </button>
                </div>
              </div>
            </div>

            {/* Code editor panel remains same as previous example */}
            {showCode && (
              <div className="w-1/2 bg-gray-700 rounded-lg p-6">
                {/* ... Same code editor UI ... */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MazeGame;