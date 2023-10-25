export interface GridPosition {
  row: number;
  column: number;
}

export type GridConfiguration = Array<Array<number>>;

export enum Tile {
  EMPTY = 0,
  WALL = 1, // Immovable object
  OBSTACLE = 2, // Movable object
  PLAYER = 3,
  STICKY = 4,
}

export type TileSet = Array<Tile>;

export interface GameLevel {
  // Starting configuration of the game board
  startingConfiguration: GridConfiguration;

  // Custom goal position. Will default the middle of the board
  goal?: GridPosition | null;

  // Difficulty of the level
  difficulty?: 1 | 2 | 3 | 4 | 5;

  // Name of the level
  name?: string;

  // Author of the level
  author?: string;
}

export interface LevelQueryParameters {
  code: string;
}
