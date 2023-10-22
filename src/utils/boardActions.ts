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

export const isBarrier = (check: number) => {
  return check === 2 || check === 3 || check === 4;
};

/**
 * Returns an array of possible destination tile positions for a selected tile
 *
 * @todo Refactor code to make less redundant, possibly split into multiple functions
 *
 * @param board - The board to check against
 * @param tilePos - Position of the tile to check
 * @returns
 */
export const getDestinationTiles = (
  board: GridConfiguration,
  tilePos: GridPosition
): Array<GridPosition> => {
  const boardSizeX = board[0].length;
  const boardSizeY = board.length;

  const value = board[tilePos.row][tilePos.column];

  // Check if tile is movable
  if (value !== 2 && value !== 3) return [];

  const destinations: Array<GridPosition> = [];

  // West
  for (let i = tilePos.column - 1; i >= 1; i--) {
    const current = board[tilePos.row][i];
    const check = board[tilePos.row][i - 1];
    if (!isBarrier(current) && isBarrier(check)) {
      destinations.push({ row: tilePos.row, column: i });
      if (check !== 4) break;
    }
  }

  // East
  for (let i = tilePos.column + 1; i < boardSizeX - 1; i++) {
    const current = board[tilePos.row][i];
    const check = board[tilePos.row][i + 1];
    if (!isBarrier(current) && isBarrier(check)) {
      destinations.push({ row: tilePos.row, column: i });
      if (check !== 4) break;
    }
  }

  // South
  for (let i = tilePos.row - 1; i >= 1; i--) {
    const current = board[i][tilePos.column];
    const check = board[i - 1][tilePos.column];
    if (!isBarrier(current) && isBarrier(check)) {
      destinations.push({ row: i, column: tilePos.column });
      if (check !== 4) break;
    }
  }

  // North
  for (let i = tilePos.row + 1; i < boardSizeY - 1; i++) {
    const current = board[i][tilePos.column];
    const check = board[i + 1][tilePos.column];
    if (!isBarrier(current) && isBarrier(check)) {
      destinations.push({ row: i, column: tilePos.column });
      if (check !== 4) break;
    }
  }

  return destinations;
};

export const moveTile = (
  board: GridConfiguration,
  tile: GridPosition,
  destination: GridPosition
): boolean => {
  console.log("Checking...");
  const checkDestinationTiles =
    getDestinationTiles(board, tile).filter(
      pos => pos.row === destination.row && pos.column === destination.column
    ).length !== 0;

  if (checkDestinationTiles) {
    board[destination.row][destination.column] = board[tile.row][tile.column];
    board[tile.row][tile.column] = 0;
    return true;
  }
  return false;
};
