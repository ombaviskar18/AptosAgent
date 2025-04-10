'use client';

import { useState, useEffect, useCallback } from 'react';
import { Code, Trophy, Zap, Cpu } from 'lucide-react';

const ConnectFour = () => {
  const ROWS = 6;
  const COLS = 7;
  const WIN_LENGTH = 4;
  const AI_DELAY = 800;

  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [message, setMessage] = useState("Your turn");

  // Check for winner
  const checkWinner = (currentBoard, player) => {
    // Horizontal check
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (currentBoard[row][col] === player &&
          currentBoard[row][col + 1] === player &&
          currentBoard[row][col + 2] === player &&
          currentBoard[row][col + 3] === player) {
          return true;
        }
      }
    }

    // Vertical check
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS; col++) {
        if (currentBoard[row][col] === player &&
          currentBoard[row + 1][col] === player &&
          currentBoard[row + 2][col] === player &&
          currentBoard[row + 3][col] === player) {
          return true;
        }
      }
    }

    // Diagonal down-right check
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (currentBoard[row][col] === player &&
          currentBoard[row + 1][col + 1] === player &&
          currentBoard[row + 2][col + 2] === player &&
          currentBoard[row + 3][col + 3] === player) {
          return true;
        }
      }
    }

    // Diagonal up-right check
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (currentBoard[row][col] === player &&
          currentBoard[row - 1][col + 1] === player &&
          currentBoard[row - 2][col + 2] === player &&
          currentBoard[row - 3][col + 3] === player) {
          return true;
        }
      }
    }

    return false;
  };

  // Find valid moves
  const getValidMoves = (currentBoard) => {
    return Array(COLS).fill().map((_, col) => {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (!currentBoard[row][col]) return col;
      }
      return null;
    }).filter(col => col !== null);
  };

  // AI move using minimax algorithm
  const aiMove = useCallback(() => {
    const currentBoard = [...board];
    const validMoves = getValidMoves(currentBoard);
    
    // Check immediate win
    for (const col of validMoves) {
      const tempBoard = JSON.parse(JSON.stringify(currentBoard));
      const row = tempBoard.findIndex(r => !r[col]);
      tempBoard[row][col] = 'ai';
      if (checkWinner(tempBoard, 'ai')) return col;
    }

    // Block player win
    for (const col of validMoves) {
      const tempBoard = JSON.parse(JSON.stringify(currentBoard));
      const row = tempBoard.findIndex(r => !r[col]);
      tempBoard[row][col] = 'player';
      if (checkWinner(tempBoard, 'player')) return col;
    }

    // Random valid move
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }, [board]);

  // Handle player move
  const handleMove = (col) => {
    if (!isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = 'player';
        break;
      }
    }

    setBoard(newBoard);
    setIsPlayerTurn(false);

    if (checkWinner(newBoard, 'player')) {
      setPlayerScore(s => s + 1);
      setGameOver(true);
      setMessage("You win!");
      return;
    }

    setMessage("AI thinking...");
  };

  // Handle AI move
  useEffect(() => {
    if (isPlayerTurn || gameOver) return;

    const timer = setTimeout(() => {
      const aiCol = aiMove();
      const newBoard = [...board];
      for (let row = ROWS - 1; row >= 0; row--) {
        if (!newBoard[row][aiCol]) {
          newBoard[row][aiCol] = 'ai';
          break;
        }
      }

      setBoard(newBoard);
      setIsPlayerTurn(true);

      if (checkWinner(newBoard, 'ai')) {
        setAiScore(s => s + 1);
        setGameOver(true);
        setMessage("AI wins!");
      } else if (getValidMoves(newBoard).length === 0) {
        setGameOver(true);
        setMessage("Draw!");
      } else {
        setMessage("Your turn");
      }
    }, AI_DELAY);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, gameOver, aiMove, board]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setGameOver(false);
    setIsPlayerTurn(true);
    setMessage("Your turn");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-4">
            <Zap className="text-yellow-400" />
            Connect Four AI
            <Cpu className="text-blue-400" />
          </h1>

          <div className="flex flex-col items-center">
            <div className="mb-8 text-xl font-bold text-center">
              {message}
            </div>

            <div className="bg-blue-900 p-4 rounded-lg">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className="w-16 h-16 flex items-center justify-center relative group"
                      onClick={() => !cell && handleMove(colIndex)}
                    >
                      <div className="absolute inset-0 bg-blue-600 rounded-full opacity-50 group-hover:opacity-30 transition-opacity" />
                      <div className={`w-14 h-14 rounded-full ${cell ? 
                        cell === 'player' ? 'bg-red-500' : 'bg-yellow-400' : 
                        'bg-gray-800'} transition-all duration-300
                        ${!cell && isPlayerTurn ? 'hover:bg-gray-700 cursor-pointer' : ''}
                        ${cell && 'animate-drop'}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="w-full max-w-xl flex justify-between my-8">
              <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                <h2 className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  YOU
                </h2>
                <p className="text-4xl">{playerScore}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
                <h2 className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                  <Cpu className="w-6 h-6" />
                  AI
                </h2>
                <p className="text-4xl">{aiScore}</p>
              </div>
            </div>

            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {gameOver ? 'PLAY AGAIN' : 'RESET GAME'}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes drop {
          0% { transform: translateY(-500%); }
          100% { transform: translateY(0); }
        }
        .animate-drop {
          animation: drop 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConnectFour;