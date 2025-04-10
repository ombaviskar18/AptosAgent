'use client';

import { useState, useEffect } from 'react';
import { Code, Trophy, X, Circle ,Cpu} from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [message, setMessage] = useState("Your turn (X)");
  const [difficulty, setDifficulty] = useState('hard'); // easy, medium, hard

  // Winning combinations
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Check for winner
  const checkWinner = (currentBoard) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  // Check for draw
  const checkDraw = (currentBoard) => {
    return currentBoard.every(cell => cell !== null) && !checkWinner(currentBoard);
  };

  // Handle player move
  const handleMove = (index) => {
    if (board[index] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner) {
      setPlayerScore(s => s + 1);
      setGameOver(true);
      setMessage("You win!");
      return;
    }

    if (checkDraw(newBoard)) {
      setGameOver(true);
      setMessage("It's a draw!");
      return;
    }

    setMessage("AI thinking...");
  };

  // AI move logic based on difficulty
  const aiMove = () => {
    let move;
    const currentBoard = [...board];
    
    if (difficulty === 'easy') {
      // Random move
      const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null);
      move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } 
    else if (difficulty === 'medium') {
      // Sometimes random, sometimes smart
      if (Math.random() > 0.5) {
        move = findBestMove(currentBoard);
      } else {
        const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null);
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    } 
    else {
      // Hard (unbeatable)
      move = findBestMove(currentBoard);
    }

    return move;
  };

  // Minimax algorithm for unbeatable AI
  const findBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const winner = checkWinner(currentBoard);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (checkDraw(currentBoard)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Handle AI move
  useEffect(() => {
    if (isPlayerTurn || gameOver) return;

    const timer = setTimeout(() => {
      const move = aiMove();
      if (move === null) return;

      const newBoard = [...board];
      newBoard[move] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);

      const winner = checkWinner(newBoard);
      if (winner) {
        setAiScore(s => s + 1);
        setGameOver(true);
        setMessage("AI wins!");
        return;
      }

      if (checkDraw(newBoard)) {
        setGameOver(true);
        setMessage("It's a draw!");
        return;
      }

      setMessage("Your turn (X)");
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, gameOver, board, difficulty]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setIsPlayerTurn(true);
    setMessage("Your turn (X)");
  };

  // Change difficulty
  const changeDifficulty = (level) => {
    setDifficulty(level);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-4">
            <Trophy className="text-yellow-400" />
            Tic-Tac-Toe AI
            <Cpu className="text-blue-400" />
          </h1>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => changeDifficulty('easy')}
              className={`px-4 py-2 rounded-lg ${difficulty === 'easy' ? 'bg-green-600' : 'bg-gray-700'}`}
            >
              Easy
            </button>
            <button
              onClick={() => changeDifficulty('medium')}
              className={`px-4 py-2 rounded-lg ${difficulty === 'medium' ? 'bg-yellow-600' : 'bg-gray-700'}`}
            >
              Medium
            </button>
            <button
              onClick={() => changeDifficulty('hard')}
              className={`px-4 py-2 rounded-lg ${difficulty === 'hard' ? 'bg-red-600' : 'bg-gray-700'}`}
            >
              Hard
            </button>
          </div>

          <div className="mb-6 text-xl font-bold text-center">
            {message}
          </div>

          <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto mb-8">
            {board.map((cell, index) => (
              <div
                key={index}
                className="bg-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => handleMove(index)}
              >
                {cell === 'X' && <X className="w-12 h-12 text-red-500" />}
                {cell === 'O' && <Circle className="w-10 h-10 text-blue-400" />}
              </div>
            ))}
          </div>

          <div className="w-full flex justify-between my-6">
            <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
              <h2 className="text-xl font-bold text-red-500 flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                YOU
              </h2>
              <p className="text-3xl">{playerScore}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center flex-1 mx-2">
              <h2 className="text-xl font-bold text-blue-400 flex items-center justify-center gap-2">
                <Circle className="w-5 h-5" />
                AI
              </h2>
              <p className="text-3xl">{aiScore}</p>
            </div>
          </div>

          <button 
            onClick={resetGame}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {gameOver ? 'PLAY AGAIN' : 'RESET GAME'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;