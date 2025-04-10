'use client';

import { useState, useEffect, useCallback } from 'react';
import { Code, Trophy, Skull, BookOpen } from 'lucide-react';

const HangmanChallenge = () => {
  // Game categories with difficulty-based words
  const wordCategories = {
    tech: ['algorithm', 'blockchain', 'cybersecurity', 'javascript', 'quantum', 'neuralnetwork'],
    animals: ['chameleon', 'rhinoceros', 'platypus', 'mongoose', 'komodo', 'axolotl'],
    science: ['photosynthesis', 'electromagnetic', 'paleontology', 'astrophysics', 'biochemistry', 'nanotechnology']
  };

  const MAX_WRONG_GUESSES = 6;
  const [selectedCategory, setSelectedCategory] = useState('tech');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('selecting'); // selecting, playing, won, lost
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Choose a category to begin');

  // Initialize new game
  const startNewGame = useCallback(() => {
    const words = wordCategories[selectedCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord.toLowerCase());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setMessage(`Category: ${selectedCategory} - Guess the word!`);
  }, [selectedCategory]);

  // Handle letter guess
  const handleGuess = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setGameStatus('lost');
        setMessage(`Game Over! The word was: ${word}`);
      }
    } else {
      // Check if player won
      if (word.split('').every(char => newGuessedLetters.includes(char))) {
        setGameStatus('won');
        setScore(prev => prev + 1);
        setMessage('Congratulations! You won!');
      }
    }
  };

  // Keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus !== 'playing') return;
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key) && !guessedLetters.includes(key)) {
        handleGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus, guessedLetters]);

  // Render the hangman figure
  const renderHangman = () => {
    return (
      <div className="relative w-48 h-64 mx-auto">
        {/* Gallows */}
        <div className="absolute top-0 left-1/2 w-1 h-16 bg-gray-300 -ml-0.5" />
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gray-300" />
        <div className="absolute top-16 left-1/2 w-24 h-1 bg-gray-300 -ml-24" />
        <div className="absolute top-64 left-1/2 w-32 h-1 bg-gray-300 -ml-16" />
        
        {/* Head */}
        {wrongGuesses >= 1 && (
          <div className="absolute top-16 left-1/2 w-8 h-8 rounded-full border-4 border-gray-300 -ml-4" />
        )}
        
        {/* Body */}
        {wrongGuesses >= 2 && (
          <div className="absolute top-24 left-1/2 w-1 h-16 bg-gray-300 -ml-0.5" />
        )}
        
        {/* Arms */}
        {wrongGuesses >= 3 && (
          <>
            <div className="absolute top-28 left-1/2 w-12 h-1 bg-gray-300 -ml-12 rotate-12 origin-right" />
            <div className="absolute top-28 left-1/2 w-12 h-1 bg-gray-300 -ml-0.5 -rotate-12 origin-left" />
          </>
        )}
        
        {/* Legs */}
        {wrongGuesses >= 4 && (
          <>
            <div className="absolute top-40 left-1/2 w-12 h-1 bg-gray-300 -ml-12 rotate-12 origin-right" />
            <div className="absolute top-40 left-1/2 w-12 h-1 bg-gray-300 -ml-0.5 -rotate-12 origin-left" />
          </>
        )}
        
        {/* Face (only when lost) */}
        {gameStatus === 'lost' && wrongGuesses >= MAX_WRONG_GUESSES && (
          <>
            <div className="absolute top-20 left-1/2 w-1 h-1 bg-gray-300 -ml-4" />
            <div className="absolute top-20 left-1/2 w-1 h-1 bg-gray-300 -ml-0.5" />
            <div className="absolute top-22 left-1/2 w-4 h-1 bg-gray-300 -ml-2" />
          </>
        )}
      </div>
    );
  };

  // Display word with blanks/guessed letters
  const displayWord = () => {
    return word.split('').map((letter, index) => (
      <span 
        key={index} 
        className="inline-block w-8 h-8 mx-1 text-center text-2xl border-b-2 border-white"
      >
        {guessedLetters.includes(letter) ? letter : ''}
      </span>
    ));
  };

  // Keyboard letters
  const renderKeyboard = () => {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
        className={`w-8 h-8 m-1 rounded-md ${
          guessedLetters.includes(letter)
            ? word.includes(letter)
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-4">
            <Skull className="text-red-500" />
            Hangman Challenge
            <BookOpen className="text-blue-400" />
          </h1>

          <div className="flex flex-col items-center">
            {/* Score and Category Selector */}
            <div className="w-full flex justify-between mb-8">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <h2 className="text-xl font-bold">Score</h2>
                <p className="text-3xl">{score}</p>
              </div>
              
              {gameStatus === 'selecting' ? (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-xl font-bold mb-2">Select Category</h2>
                  <div className="flex gap-2">
                    {Object.keys(wordCategories).map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          startNewGame();
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md capitalize"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h2 className="text-xl font-bold">Category</h2>
                  <p className="text-xl capitalize">{selectedCategory}</p>
                </div>
              )}
            </div>

            {/* Game Status Message */}
            <div className="text-xl font-bold mb-4 text-center min-h-8">
              {message}
            </div>

            {/* Hangman Drawing */}
            {gameStatus !== 'selecting' && renderHangman()}

            {/* Word Display */}
            {gameStatus === 'playing' && (
              <div className="my-8 flex justify-center flex-wrap">
                {displayWord()}
              </div>
            )}

            {/* Keyboard */}
            {gameStatus === 'playing' && (
              <div className="mt-8 flex flex-wrap justify-center max-w-md">
                {renderKeyboard()}
              </div>
            )}

            {/* Game Over Controls */}
            {(gameStatus === 'won' || gameStatus === 'lost') && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={startNewGame}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-md"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setGameStatus('selecting')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
                >
                  Change Category
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangmanChallenge;