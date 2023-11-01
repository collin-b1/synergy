import { MOVABLE_TILES, SOLID_TILES, DESTINATION_TILES } from "@/constants";
import { GameLevel, GridConfiguration, GridPosition, Tile } from "@/types";

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

export const isDestinationTile = (tile: Tile) =>
  DESTINATION_TILES.includes(tile);
export const isSolidTile = (tile: Tile) => SOLID_TILES.includes(tile);
export const isMovableTile = (tile: Tile) => MOVABLE_TILES.includes(tile);

/**
 * Returns an array of possible destination tile positions for a selected tile
 *
 * @param board - The board to check against
 * @param tilePos - Position of the tile to check
 * @returns Array of playable GridPositions
 */
export const getDestinationTiles = (
  board: GridConfiguration,
  tilePos: GridPosition
): Array<GridPosition> => {
  const boardRows = board.length;
  const boardColumns = board[0].length;

  // Check if tile is actually movable
  const tile: Tile = board[tilePos.row][tilePos.column];
  if (!isMovableTile(tile)) return [];

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

/**
 *
 * @param board - The original board state
 * @param tile - The tile to move
 * @param destination - The desired destination
 * @returns New board configuration if allowed, null if not
 */
export const moveTile = (
  board: GridConfiguration,
  tile: GridPosition,
  destination: GridPosition
): GridConfiguration | null => {
  const destinationTiles = getDestinationTiles(board, tile);
  if (
    destinationTiles.some(
      d => d.column === destination.column && d.row === destination.row
    )
  ) {
    const clone = structuredClone(board);
    clone[destination.row][destination.column] = clone[tile.row][tile.column];
    clone[tile.row][tile.column] = Tile.EMPTY;
    return clone;
  }
  return null;
};

export const encodeLevelString = (level: GameLevel): string | undefined => {
  try {
    const str = JSON.stringify(level);
    return btoa(str);
  } catch (e) {
    return undefined;
  }
};

export const decodeLevelString = (code: string): GameLevel | undefined => {
  try {
    const decoded = atob(code);
    const level: GameLevel = JSON.parse(decoded);
    return level;
  } catch (e) {
    return undefined;
  }
};
