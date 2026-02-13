import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Tic Tac Toe board (3x3 grid).
 * @param {{ squares: (null|'X'|'O')[], onPlayAt: (index: number) => void, disabled?: boolean }} props
 * @returns {JSX.Element}
 */
export default function Board({ squares, onPlayAt, disabled = false }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <div key={idx} className="ttt-cell" role="gridcell">
          <Square
            value={value}
            index={idx}
            disabled={disabled || value !== null}
            onClick={() => onPlayAt(idx)}
          />
        </div>
      ))}
    </div>
  );
}
