import CONSTANTS from "@/constants";
import { GridConfiguration, GridPosition, Tile } from "@/types";

/**
 * Returns an x by y matrix filled with zeros.
 *
 * @param rows - Number of matrix rows
 * @param columns - Number of matrix columns
 * @returns An Array of Arrays filled with zero
 */
export const createEmptyConfiguration = (
  rows: number,
  columns: number
): GridConfiguration => {
  return Array.from(Array(rows), () => Array(columns).fill(0));
};

export const isDestinationTile = (tile: Tile): boolean => {
  return CONSTANTS.DESTINATION_TILES.includes(tile);
};
export const isSolidTile = (tile: Tile): boolean => {
  return CONSTANTS.SOLID_TILES.includes(tile);
};
export const isMovableTile = (tile: Tile): boolean => {
  return CONSTANTS.MOVABLE_TILES.includes(tile);
};

/**
 * Returns an array of possible destination tile positions for a selected tile
 *
 * @todo Make this function less stupid and redundant
 *
 * @param board - The board to check against
 * @param tilePos - Position of the tile to check
 * @returns
 */
export const getDestinationTiles = (
  board: GridConfiguration,
  tilePos: GridPosition
): Array<GridPosition> => {
  const boardRows = board.length;
  const boardColumns = board[0].length;
  const tile: Tile = board[tilePos.row][tilePos.column];

  // Check if tile is actually movable
  if (!isMovableTile(tile)) return [];

  // Powered tiles may only move if adjacent to a player
  if (tile === Tile.POWERED && !isPlayerAdjacent(board, tilePos)) return [];

  const destinations: Array<GridPosition> = [];

  // West
  for (let i = tilePos.column; i >= 1; i--) {
    const current: Tile = board[tilePos.row][i];
    const check: Tile = board[tilePos.row][i - 1];
    if (isDestinationTile(check)) {
      if (current === Tile.EMPTY) {
        destinations.push({ row: tilePos.row, column: i });
      }
      if (isSolidTile(check)) break;
    }
  }

  // East
  for (let i = tilePos.column; i < boardColumns - 1; i++) {
    const current: Tile = board[tilePos.row][i];
    const check: Tile = board[tilePos.row][i + 1];
    if (isDestinationTile(check)) {
      if (current === Tile.EMPTY) {
        destinations.push({ row: tilePos.row, column: i });
      }
      if (isSolidTile(check)) break;
    }
  }

  // South
  for (let i = tilePos.row; i >= 1; i--) {
    const current: Tile = board[i][tilePos.column];
    const check: Tile = board[i - 1][tilePos.column];
    if (isDestinationTile(check)) {
      if (current === Tile.EMPTY) {
        destinations.push({ row: i, column: tilePos.column });
      }
      if (isSolidTile(check)) break;
    }
  }

  // North
  for (let i = tilePos.row; i < boardRows - 1; i++) {
    const current: Tile = board[i][tilePos.column];
    const check: Tile = board[i + 1][tilePos.column];
    if (isDestinationTile(check)) {
      if (current === Tile.EMPTY) {
        destinations.push({ row: i, column: tilePos.column });
      }
      if (isSolidTile(check)) break;
    }
  }

  return destinations;
};

export const hasWon = (
  board: GridConfiguration,
  goal: GridPosition
): boolean => {
  return board[goal.row][goal.column] === Tile.PLAYER;
};

export const moveTile = (
  board: GridConfiguration,
  tile: GridPosition,
  destination: GridPosition
): GridConfiguration | null => {
  // Check if tile is of moveable type
  if (isMovableTile(board[tile.row][tile.column])) {
    // Check if tile is in destinations
    const checkDestinationTiles = getDestinationTiles(board, tile).some(
      pos => pos.row === destination.row && pos.column === destination.column
    );

    if (checkDestinationTiles) {
      const newBoard = structuredClone(board);
      newBoard[destination.row][destination.column] =
        board[tile.row][tile.column];
      newBoard[tile.row][tile.column] = Tile.EMPTY;
      return newBoard;
    }
  }
  return null;
};

export const isPlayerAdjacent = (
  board: GridConfiguration,
  tile: GridPosition
) => {
  const { row, column } = tile;
  return (
    (row > 0 && board[row - 1][column] === Tile.PLAYER) ||
    (row < board.length - 1 && board[row + 1][column] === Tile.PLAYER) ||
    (column > 0 && board[row][column - 1] === Tile.PLAYER) ||
    (column < board[0].length - 1 && board[row][column + 1] === Tile.PLAYER)
  );
};
