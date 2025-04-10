'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Trophy, Zap, Gauge } from 'lucide-react';

const ReactionDuel = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, reacting, result
  const [result, setResult] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [reactionTime, setReactionTime] = useState(0);
  const reactionStart = useRef(0);
  const aiTimeout = useRef(null);
  const countdownInterval = useRef(null);
  const gameTimeout = useRef(null);

  // Game configuration
  const MIN_DELAY = 2000;
  const MAX_DELAY = 5000;
  const AI_MIN_REACTION = 150;
  const AI_MAX_REACTION = 400;
  const WIN_SCORE = 5;

  const startNewRound = () => {
    setGameStatus('waiting');
    setCountdown(3);
    setResult('');
    
    // Countdown sequence
    countdownInterval.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval.current);
          startReactionTest();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startReactionTest = () => {
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    
    gameTimeout.current = setTimeout(() => {
      reactionStart.current = Date.now();
      setGameStatus('reacting');
      
      // AI reaction
      const aiReactionTime = AI_MIN_REACTION + Math.random() * (AI_MAX_REACTION - AI_MIN_REACTION);
      aiTimeout.current = setTimeout(() => {
        if (gameStatus === 'reacting') {
          handleAiReaction();
        }
      }, aiReactionTime);
    }, delay);
  };

  const handleClick = () => {
    if (gameStatus !== 'reacting') {
      if (gameStatus === 'waiting') {
        setResult('Too early! -1 point');
        setPlayerScore(prev => Math.max(0, prev - 1));
      }
      return;
    }

    const reaction = Date.now() - reactionStart.current;
    setReactionTime(reaction);
    determineWinner(reaction);
    setGameStatus('result');
    clearTimeout(aiTimeout.current);
  };

  const handleAiReaction = () => {
    const aiReaction = Date.now() - reactionStart.current;
    determineWinner(aiReaction, true);
    setGameStatus('result');
  };

  const determineWinner = (time, isAi = false) => {
    const aiTime = isAi ? time : AI_MIN_REACTION + Math.random() * (AI_MAX_REACTION - AI_MIN_REACTION);
    const playerTime = isAi ? reactionTime : time;

    if (isAi) {
      setResult(`AI reacted in ${aiTime}ms`);
      if (playerTime === 0 || aiTime < playerTime) {
        setAiScore(prev => prev + 1);
      }
    } else {
      setResult(`Your time: ${playerTime}ms vs AI: ${aiTime}ms`);
      if (playerTime < aiTime) {
        setPlayerScore(prev => prev + 1);
      } else {
        setAiScore(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (playerScore >= WIN_SCORE || aiScore >= WIN_SCORE) {
      setGameStatus('result');
      clearTimeout(gameTimeout.current);
      clearTimeout(aiTimeout.current);
      clearInterval(countdownInterval.current);
    }
  }, [playerScore, aiScore]);

  useEffect(() => {
    startNewRound();
    return () => {
      clearTimeout(gameTimeout.current);
      clearTimeout(aiTimeout.current);
      clearInterval(countdownInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono relative">
      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="max-w-6xl mx-auto bg-black border-8 border-gray-800 rounded-lg p-8 shadow-glow">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-4">
            <Zap className="text-yellow-400" />
            Reaction Duel
            <Gauge className="text-blue-400" />
          </h1>

          <div className="flex flex-col items-center">
            <div 
              className={`w-96 h-96 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                gameStatus === 'reacting' 
                  ? 'bg-green-500 scale-110' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={handleClick}
            >
              {gameStatus === 'waiting' && (
                <div className="text-6xl font-bold">{countdown}</div>
              )}
              {gameStatus === 'reacting' && (
                <div className="text-3xl text-center">CLICK NOW!</div>
              )}
              {gameStatus === 'result' && (
                <div className="text-2xl text-center">
                  {result}
                  <br />
                  {reactionTime > 0 && `Your time: ${reactionTime}ms`}
                </div>
              )}
            </div>

            <div className="w-full max-w-xl flex justify-between my-8">
              <div className="bg-gray-800 p-4 rounded-lg text-center flex-1 mx-2">
                <h2 className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  YOU
                </h2>
                <p className="text-4xl">{playerScore}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center flex-1 mx-2">
                <h2 className="text-2xl font-bold text-purple-400 flex items-center justify-center gap-2">
                  <Gauge className="w-6 h-6" />
                  AI
                </h2>
                <p className="text-4xl">{aiScore}</p>
              </div>
            </div>

            {(playerScore >= WIN_SCORE || aiScore >= WIN_SCORE) && (
              <div className="text-3xl font-bold text-yellow-400 mb-4">
                {playerScore >= WIN_SCORE ? 'YOU WIN THE DUEL!' : 'AI WINS THE DUEL!'}
              </div>
            )}

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setPlayerScore(0);
                  setAiScore(0);
                  startNewRound();
                }}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                NEW DUEL
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 25px rgba(110, 231, 183, 0.3);
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ReactionDuel;