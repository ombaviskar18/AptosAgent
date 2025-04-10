'use client';
import { useState, useEffect } from 'react';
import { Zap, Cpu } from 'lucide-react';

const MemoryMatch = () => {
  // Game setup
  const cardSymbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("Your turn - Flip a card!");

  // Initialize game
  const initGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({ id, symbol, flipped: false }));

    setCards(cardPairs);
    setFlipped([]);
    setMatched([]);
    setGameOver(false);
    setIsPlayerTurn(true);
    setMessage("Your turn - Flip a card!");
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (!isPlayerTurn || gameOver || flipped.length >= 2) return;

    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.flipped || matched.includes(clickedCard.symbol)) return;

    // Flip the card
    const newCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setFlipped([...flipped, id]);

    // Check for match if two cards are flipped
    if (flipped.length === 1) {
      const firstCard = cards.find(card => card.id === flipped[0]);
      if (firstCard.symbol === clickedCard.symbol) {
        // Match found
        setMatched([...matched, clickedCard.symbol]);
        setPlayerScore(score => score + 1);
        setFlipped([]);
        setMessage("Match! Keep going!");
      } else {
        // No match - switch turns
        setMessage("No match - AI's turn");
        setIsPlayerTurn(false);
        setTimeout(() => {
          // Flip cards back after delay
          setCards(cards.map(card => 
            flipped.includes(card.id) || card.id === id 
              ? { ...card, flipped: false } 
              : card
          ));
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // AI turn
  useEffect(() => {
    if (isPlayerTurn || gameOver) return;

    const aiTurn = setTimeout(() => {
      // Find unmatched cards
      const unflippedCards = cards.filter(
        card => !card.flipped && !matched.includes(card.symbol)
      );

      if (unflippedCards.length === 0) return;

      // AI picks first card
      const firstPick = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
      let secondPick;

      // Try to find a match from memory
      const knownSymbol = cards.find(card => 
        card.flipped && !matched.includes(card.symbol)?.symbol
      );
      
      if (knownSymbol) {
        const potentialMatch = unflippedCards.find(card => 
          card.symbol === knownSymbol && card.id !== firstPick.id
        );
        if (potentialMatch) secondPick = potentialMatch;
      }

      // If no known match, pick random second card
      if (!secondPick) {
        const remainingCards = unflippedCards.filter(card => card.id !== firstPick.id);
        secondPick = remainingCards[Math.floor(Math.random() * remainingCards.length)];
      }

      // Flip both cards
      setCards(cards.map(card => 
        card.id === firstPick.id || card.id === secondPick.id 
          ? { ...card, flipped: true } 
          : card
      ));
      setFlipped([firstPick.id, secondPick.id]);

      // Check for match
      setTimeout(() => {
        if (firstPick.symbol === secondPick.symbol) {
          setMatched([...matched, firstPick.symbol]);
          setAiScore(score => score + 1);
          setFlipped([]);
          setMessage("AI found a match! Still AI's turn");
        } else {
          // Flip cards back and switch turns
          setCards(cards.map(card => 
            card.id === firstPick.id || card.id === secondPick.id 
              ? { ...card, flipped: false } 
              : card
          ));
          setFlipped([]);
          setIsPlayerTurn(true);
          setMessage("Your turn - Flip a card!");
        }
      }, 1000);
    }, 1500);

    return () => clearTimeout(aiTurn);
  }, [isPlayerTurn, gameOver, cards, matched]);

  // Check for game over
  useEffect(() => {
    if (matched.length === cardSymbols.length) {
      setGameOver(true);
      setMessage(playerScore > aiScore ? "You win!" : "AI wins!");
    }
  }, [matched, playerScore, aiScore]);

  // Initialize game on first render
  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Zap className="text-yellow-400" /> 
          Memory Match 
          <Cpu className="text-blue-400" />
        </h1>

        <div className="text-center mb-4 text-xl">{message}</div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-20 flex items-center justify-center text-3xl rounded-lg cursor-pointer transition-all duration-300 ${
                card.flipped || matched.includes(card.symbol)
                  ? 'bg-blue-600 transform rotate-y-180'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {card.flipped || matched.includes(card.symbol) ? card.symbol : '?'}
            </div>
          ))}
        </div>

        <div className="flex justify-between mb-6">
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <div className="flex items-center justify-center gap-2">
              <Zap className="text-yellow-400" />
              <span className="text-xl">You: {playerScore}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <div className="flex items-center justify-center gap-2">
              <Cpu className="text-blue-400" />
              <span className="text-xl">AI: {aiScore}</span>
            </div>
          </div>
        </div>

        {gameOver && (
          <button
            onClick={initGame}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-colors"
          >
            Play Again
          </button>
        )}
      </div>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryMatch;