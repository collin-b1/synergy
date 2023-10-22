import { GridConfiguration, GridPosition } from "@/lib/types";

/**
 * Returns an x by y matrix filled with zeros.
 *
 * @param sizeX - Number of matrix columns
 * @param sizeY - Number of matrix rows
 * @returns An Array of Arrays filled with zero
 */
export const createEmptyConfiguration = (
  sizeX: number,
  sizeY: number
): GridConfiguration => {
  return Array.from(Array(sizeY), () => Array(sizeX).fill(0));
};

export const getDestinationTiles = (
  board: GridConfiguration,
  tilePos: GridPosition
): Array<GridPosition> => {
  //const value = board[tilePos.row][tilePos.column];
  const boardSizeX = board[0].length;
  const boardSizeY = board.length;

  const value = board[tilePos.row][tilePos.column];

  // Check if tile is movable
  if (value !== 2 && value !== 3) return [];

  // Check edge cases (literally)
  /*if (tilePos.column === boardSizeX && direction === "right") return [];
  if (tilePos.column === 0 && direction === "left") return [];
  if (tilePos.row === boardSizeY && direction === "down") return [];
  if (tilePos.row === 0 && direction === "up") return [];*/

  //const offset = direction === "up" || direction === "right" ? 1 : -1;

  const destinations: Array<GridPosition> = [];

  // x direction checks
  for (let i = tilePos.column - 1; i >= 1; i--) {
    const check = board[tilePos.row][i - 1];
    if (check === 2 || check === 3) {
      destinations.push({ row: tilePos.row, column: i });
      break;
    }
  }

  for (let i = tilePos.column + 1; i < boardSizeX - 1; i++) {
    const check = board[tilePos.row][i + 1];
    if (check === 2 || check === 3) {
      destinations.push({ row: tilePos.row, column: i });
      break;
    }
  }

  // y direction checks
  for (let i = tilePos.row - 1; i >= 1; i--) {
    const check = board[i - 1][tilePos.column];
    if (check === 2 || check === 3) {
      destinations.push({ row: i, column: tilePos.column });
      break;
    }
  }

  for (let i = tilePos.row + 1; i < boardSizeY - 1; i++) {
    const check = board[i + 1][tilePos.column];
    if (check === 2 || check === 3) {
      destinations.push({ row: i, column: tilePos.column });
      break;
    }
  }

  return destinations;
};
