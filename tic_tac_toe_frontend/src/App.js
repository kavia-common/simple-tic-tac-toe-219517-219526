import React, { useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner, isDraw } from "./utils/game";

const EMPTY_BOARD = Array(9).fill(null);

const WIN_LINES = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * PUBLIC_INTERFACE
 * Main application entry for the Tic Tac Toe game.
 * Manages board state, current player, winner/draw detection, and reset.
 *
 * @returns {JSX.Element} The full application UI.
 */
function App() {
  const [squares, setSquares] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);

  const winningSquares = useMemo(() => {
    if (!winner) return [];
    for (const [a, b, c] of WIN_LINES) {
      const val = squares[a];
      if (val && val === squares[b] && val === squares[c]) return [a, b, c];
    }
    return [];
  }, [winner, squares]);

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw";
    return `Turn: ${xIsNext ? "X" : "O"}`;
  }, [winner, draw, xIsNext]);

  const statusTone = winner ? "winner" : draw ? "draw" : "turn";

  // PUBLIC_INTERFACE
  const handlePlayAt = (index) => {
    // Ignore input if game ended or square already taken.
    if (winner || draw || squares[index] !== null) return;

    const next = squares.slice();
    next[index] = xIsNext ? "X" : "O";

    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(EMPTY_BOARD);
    setXIsNext(true);
  };

  return (
    <div className="App">
      <main className="ttt-page">
        <section className="ttt-card" aria-label="Tic Tac Toe game">
          <header className="ttt-header">
            <div className="ttt-badge" aria-hidden="true">
              Retro Grid
            </div>
            <h1 className="ttt-title">Tic Tac Toe</h1>
            <p className="ttt-subtitle">
              Two players, one device. First to three in a row wins.
            </p>
          </header>

          <div className="ttt-statusRow" aria-live="polite" aria-atomic="true">
            <span className={`ttt-status ttt-status--${statusTone}`}>
              {statusText}
            </span>
            <span className="ttt-turnHint">
              {winner || draw
                ? "Press Reset to play again."
                : "Click an empty square to play."}
            </span>
          </div>

          <div className="ttt-boardWrap">
            <Board
              squares={squares}
              onPlayAt={handlePlayAt}
              disabled={winner || draw}
              winningSquares={winningSquares}
            />
          </div>

          <div className="ttt-actions">
            <button type="button" className="ttt-resetBtn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </section>

        <footer className="ttt-footer">
          <span className="ttt-footerText">
            Tip: Use Tab/Enter to play with keyboard.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
