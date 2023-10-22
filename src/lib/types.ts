export interface GridPosition {
  row: number;
  column: number;
}

export type GridConfiguration = Array<Array<number>>;

/** @deprecated */
export interface Movable {
  x: number;
  y: number;
}

export interface GameLevel {
  // Starting configuration of the game board
  startingConfiguration: GridConfiguration;

  // Custom goal position. Will default the middle of the board
  goal?: Array<GridPosition>;

  // Difficulty of the level
  difficulty?: 1 | 2 | 3 | 4 | 5;

  // Name of the level
  name?: string;

  // Author of the level
  author?: string;
}
