import { Chess } from 'chess.js';

self.addEventListener('message', (e) => {
  const game = new Chess(e.data.fen);
  const depth = e.data.depth;
  
  const pieceValues = {
    p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
    P: -1, N: -3, B: -3, R: -5, Q: -9, K: 0
  };

  const evaluateBoard = (game) => {
    if (game.isCheckmate()) return game.turn() === 'w' ? -1000 : 1000;
    if (game.isDraw()) return 0;

    let evaluation = 0;
    const fen = game.fen().split(' ')[0];
    for (const char of fen) {
      if (char in pieceValues) evaluation += pieceValues[char];
    }
    return evaluation;
  };

  const minimax = (node, depth, alpha, beta, maximizingPlayer) => {
    if (depth === 0 || node.isGameOver()) {
      return evaluateBoard(node);
    }

    const moves = node.moves({ verbose: true });
    let bestValue = maximizingPlayer ? -Infinity : Infinity;

    for (const move of moves) {
      const child = new Chess(node.fen());
      child.move(move);
      const value = minimax(child, depth - 1, alpha, beta, !maximizingPlayer);
      
      if (maximizingPlayer) {
        bestValue = Math.max(bestValue, value);
        alpha = Math.max(alpha, bestValue);
      } else {
        bestValue = Math.min(bestValue, value);
        beta = Math.min(beta, bestValue);
      }
      
      if (beta <= alpha) break;
    }
    
    return bestValue;
  };

  const moves = game.moves({ verbose: true });
  let bestMove = null;
  let bestValue = -Infinity;

  for (const move of moves) {
    const child = new Chess(game.fen());
    child.move(move);
    const value = minimax(child, depth, -Infinity, Infinity, false);
    
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  self.postMessage(bestMove?.san);
});