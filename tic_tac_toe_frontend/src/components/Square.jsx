import React from "react";

/**
 * PUBLIC_INTERFACE
 * A single Tic Tac Toe square.
 * @param {{ value: (null|'X'|'O'), onClick: () => void, disabled?: boolean, index: number }} props
 * @returns {JSX.Element}
 */
export default function Square({ value, onClick, disabled = false, index, isWinning = false }) {
  return (
    <button
      type="button"
      className={`ttt-square${isWinning ? " ttt-square--win" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${index + 1}${value ? `: ${value}` : ""}${isWinning ? " (winning square)" : ""}`}
    >
      <span className="ttt-squareValue" aria-hidden="true">
        {value ?? ""}
      </span>
    </button>
  );
}
