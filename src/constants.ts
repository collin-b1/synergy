import { Tile } from "./types";
import type { TileSet } from "./types";

const LEVEL = {
  MIN_ROWS: 3,
  MAX_ROWS: 15,
  DEFAULT_ROWS: 5,

  MIN_COLUMNS: 3,
  MAX_COLUMNS: 15,
  DEFAULT_COLUMNS: 5,

  MIN_NAME_LENGTH: 0,
  MAX_NAME_LENGTH: 50,
  DEFAULT_NAME: "Untitled Level",

  MIN_AUTHOR_LENGTH: 0,
  MAX_AUTHOR_LENGTH: 20,
  DEFAULT_AUTHOR: "Anonymous",

  DEFAULT_GOAL_ROW: 2,
  DEFAULT_GOAL_COLUMN: 2,
} as const;

// Tiles which create a destination when approached
const DESTINATION_TILES: TileSet = [
  Tile.OBSTACLE,
  Tile.WALL,
  Tile.PLAYER,
  Tile.STICKY,
  Tile.POWERED,
];

// Tiles which prevent futher movement beyond itself
const SOLID_TILES: TileSet = [
  Tile.OBSTACLE,
  Tile.WALL,
  Tile.PLAYER,
  Tile.POWERED,
];

// Tiles which can be moved
const MOVABLE_TILES: TileSet = [Tile.OBSTACLE, Tile.PLAYER, Tile.POWERED];

const TILE_COLORS = new Map<Tile, string>([
  [Tile.EMPTY, "bg-gray-300 dark:bg-slate-700"],
  [Tile.WALL, "bg-gray-800"],
  [Tile.OBSTACLE, "bg-gray-600 dark:bg-gray-200"],
  [Tile.PLAYER, "bg-red-400"],
  [Tile.STICKY, "bg-green-400"],
  [Tile.POWERED, "transition-colors bg-blue-500"],
]);

const CONSTANTS = {
  LEVEL,
  DESTINATION_TILES,
  MOVABLE_TILES,
  SOLID_TILES,
  TILE_COLORS,
} as const;

export default CONSTANTS;
