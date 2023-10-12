export interface GridPosition {
  row: number;
  column: number;
}

export interface GameBoard {
  size_x: number;
  size_y: number;
  obstacles: Movable[];
}

export interface Movable {
  x: number;
  y: number;
}

export type BoardConfiguration = Array<Array<number>>;

export interface GameLevel {
  // Concatenated string of each board row
  starting: BoardConfiguration;

  // Difficulty of the level
  difficulty: 1 | 2 | 3 | 4 | 5;

  // Name of the level
  name?: string;

  // Author of the level
  author?: string;
}
