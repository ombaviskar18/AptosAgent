'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Clock, Zap, Cpu, Hourglass } from 'lucide-react';

const ChessBlitz = () => {
  const [game, setGame] = useState(new Chess());
  const [timeLeft, setTimeLeft] = useState({ white: 300, black: 300 });
  const [aiLevel, setAiLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState('playing');
  const [playerColor, setPlayerColor] = useState('white');
  const [moveCount, setMoveCount] = useState(0);
  const timerRef = useRef(null);
  const aiWorkerRef = useRef(null);

  // Initialize Web Worker
  useEffect(() => {
    aiWorkerRef.current = new Worker(
        new URL('./workers/chessAI.worker.js', import.meta.url),
      { type: 'module' }
    );

    return () => {
      if (aiWorkerRef.current) {
        aiWorkerRef.current.terminate();
      }
    };
  }, []);

  // Timer system
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => ({
          ...prev,
          [game.turn()]: Math.max(0, prev[game.turn()] - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStatus, game.turn()]);

  // Check game status
  const checkGameOver = useCallback(() => {
    if (game.isCheckmate()) {
      setGameStatus(game.turn() === 'w' ? 'black' : 'white');
      return true;
    }
    if (game.isDraw()) {
      setGameStatus('draw');
      return true;
    }
    if (timeLeft.white <= 0 || timeLeft.black <= 0) {
      setGameStatus(timeLeft.white <= 0 ? 'black' : 'white');
      return true;
    }
    return false;
  }, [game, timeLeft]);

  // AI move handler
  const makeAIMove = useCallback(() => {
    if (game.turn() !== playerColor[0] && gameStatus === 'playing') {
      aiWorkerRef.current.postMessage({
        fen: game.fen(),
        depth: Math.min(aiLevel + Math.floor(moveCount/10), 3)
      });

      aiWorkerRef.current.onmessage = (e) => {
        try {
          const move = game.move(e.data);
          setGame(new Chess(game.fen()));
          setMoveCount(c => c + 1);
          if (!checkGameOver()) {
            setTimeLeft(prev => ({ ...prev, [game.turn()]: prev[game.turn()] + 2 }));
          }
        } catch (error) {
          console.error('AI move error:', error);
        }
      };

      aiWorkerRef.current.onerror = (error) => {
        console.error('Web Worker error:', error);
      };
    }
  }, [game, playerColor, aiLevel, moveCount, checkGameOver]);

  // Player move handler
  const onDrop = (sourceSquare, targetSquare) => {
    if (game.turn() !== playerColor[0] || gameStatus !== 'playing') return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      
      setGame(new Chess(game.fen()));
      setMoveCount(c => c + 1);
      setTimeLeft(prev => ({ ...prev, [game.turn()]: prev[game.turn()] + 2 }));
      
      if (!checkGameOver()) {
        setTimeout(makeAIMove, 500);
      }
      return true;
    } catch {
      return false;
    }
  };

  // New game setup
  const newGame = (color = 'white') => {
    setGame(new Chess());
    setTimeLeft({ white: 300, black: 300 });
    setGameStatus('playing');
    setMoveCount(0);
    setPlayerColor(color);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
          <Zap className="text-yellow-400" />
          AI Chess Blitz
          <Cpu className="text-blue-400" />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              boardWidth={560}
              customBoardStyle={{
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                Play and Win 🏆
              </h2>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Hourglass className="w-6 h-6" />
                Game Status
              </h2>
              <div className="space-y-2">
                <p className="text-lg">
                  {gameStatus === 'playing' ? 
                    `${game.turn() === playerColor[0] ? 'Your' : 'AI'} Turn` : 
                    gameStatus === 'draw' ? 'Game Drawn!' : `${gameStatus.toUpperCase()} Wins!`}
                </p>
                <p>Moves: {moveCount}</p>
                <p>AI Level: {aiLevel}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => newGame('white')}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                New Game (White)
              </button>
              <button
                onClick={() => newGame('black')}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                New Game (Black)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBlitz;