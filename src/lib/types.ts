export interface GridPosition {
  row: number;
  column: number;
}

export type GridConfiguration = Array<Array<number>>;

export enum Tile {
  EMPTY = 0,
  WALL = 1, // Immovable object (unused)
  OBSTACLE = 2, // Movable object
  PLAYER = 3,
  STICKY = 4,
  POWERED = 5,
}

export type TileSet = Array<Tile>;

export interface GameLevel {
  /** Starting configuration of the game board */
  startingConfiguration: GridConfiguration;

  /** Custom goal position */
  goal?: GridPosition | null;

  /** Name of the level */
  name?: string;

  /** Author of the level */
  author?: string;

  /** Level description (used for tutorials) */
  description?: string;

  /** Number of moves per star reward from least to greatest */
  moveTiers?: [number, number];
}

export interface LevelStats {
  completed: boolean;
  time: number;
  moves: Array<[GridPosition, GridPosition]>;
  attempts: number;
}

export interface UserSettings {
  hardMode: boolean;
  saveGameData: boolean;
}

export interface LevelQueryParameters {
  code: string;
}
