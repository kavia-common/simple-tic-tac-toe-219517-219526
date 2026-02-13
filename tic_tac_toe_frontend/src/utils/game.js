/**
 * Game logic helpers for Tic Tac Toe.
 */

/**
 * PUBLIC_INTERFACE
 * Calculate the winner for a given board.
 * @param {(null|'X'|'O')[]} squares - Array of 9 elements representing the board.
 * @returns {null|'X'|'O'} The winning player or null if there is no winner.
 */
export function calculateWinner(squares) {
  const lines = [
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

  for (const [a, b, c] of lines) {
    const val = squares[a];
    if (val && val === squares[b] && val === squares[c]) return val;
  }

  return null;
}

/**
 * PUBLIC_INTERFACE
 * Determine if the game is a draw (board full and no winner).
 * @param {(null|'X'|'O')[]} squares - Array of 9 elements representing the board.
 * @returns {boolean} True if draw, otherwise false.
 */
export function isDraw(squares) {
  return calculateWinner(squares) === null && squares.every((s) => s !== null);
}
