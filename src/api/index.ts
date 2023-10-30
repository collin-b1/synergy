import type { GameLevel } from "@/lib/types";

const levels: Array<GameLevel> = [
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3],
    ],
    name: "Moving Player (Tutorial)",
    goal: { column: 2, row: 2 },
    description:
      'The goal is to reach the "Portal" tile by moving the red player. The player may only move in a straight line, and must continue to move until they reach an "Obstacle". Select the player to see available destination tiles.',
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0],
      [2, 0, 0, 2, 0],
    ],
    name: "Moving Objects (Tutorial)",
    goal: { column: 2, row: 2 },
    description:
      'Gray "Obstacles" may also be moved similarly to the player. Try to move obstacles to create a path for the player to reach the goal.',
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 2, 0, 0, 2],
      [0, 0, 0, 0, 0],
      [2, 0, 0, 0, 3],
    ],
    author: "Brian",
    name: "Tower",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [0, 2, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [2, 0, 3, 0, 2],
    ],
    author: "collin-b1",
    name: "Starship",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 2, 0, 0],
      [0, 3, 0, 0, 2],
      [2, 0, 0, 2, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    author: "collin-b1",
    name: "Slashes",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 3, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 2, 0, 2],
      [2, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
    ],
    author: "Lunar Lockout",
    name: "21",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 4, 0, 0, 0],
      [0, 0, 0, 4, 0],
      [3, 4, 0, 0, 4],
      [4, 0, 4, 0, 0],
      [0, 0, 0, 4, 0],
    ],
    name: "Sticky Zones (Tutorial)",
    goal: { row: 2, column: 2 },
    description:
      'Green "Sticky" tiles are unmovable tiles which the player may choose to stop at or continue moving through.',
  },
  {
    startingConfiguration: [
      [0, 3, 0, 0, 0],
      [2, 0, 0, 0, 2],
      [0, 0, 0, 0, 0],
      [0, 2, 0, 4, 0],
      [0, 0, 0, 0, 2],
    ],
    author: "collin-b1",
    name: "Bridge",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 3, 0, 0, 0],
      [0, 4, 0, 0, 0],
      [0, 0, 0, 0, 2],
      [4, 0, 0, 4, 0],
      [4, 0, 4, 2, 4],
    ],
    author: "collin-b1",
    name: "U-Turn",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [4, 0, 4, 2, 4],
      [4, 0, 0, 0, 2],
      [4, 0, 4, 0, 0],
      [0, 0, 4, 0, 4],
      [0, 3, 4, 0, 0],
    ],
    author: "collin-b1",
    name: "Faucet",
    goal: { column: 2, row: 1 },
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 3],
      [4, 0, 0, 2, 0],
      [0, 0, 0, 0, 4],
      [0, 0, 0, 0, 0],
      [2, 0, 4, 0, 2],
    ],
    author: "collin-b1",
    name: "Orbit",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 4, 3, 0],
      [0, 0, 0, 0, 0],
      [4, 0, 0, 0, 0],
      [2, 0, 4, 0, 4],
      [0, 4, 0, 4, 2],
    ],
    author: "collin-b1",
    name: "Waves",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 0, 4, 2],
      [4, 0, 0, 2, 4],
      [0, 4, 0, 0, 0],
      [4, 0, 4, 0, 2],
      [0, 0, 3, 0, 0],
    ],
    author: "collin-b1",
    name: "Flower",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [4, 2, 0, 0, 4],
      [4, 0, 0, 0, 4],
      [4, 0, 0, 0, 4],
      [0, 0, 4, 0, 0],
      [2, 0, 3, 0, 0],
    ],
    author: "collin-b1",
    name: "Cactus",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 2],
      [4, 3, 4, 0, 4],
      [0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0],
      [0, 0, 2, 0, 4],
    ],
    author: "collin-b1",
    name: "Rabbit Holes",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 0, 4, 4],
      [3, 0, 4, 0, 0],
      [0, 4, 0, 2, 0],
      [0, 0, 4, 0, 0],
      [2, 0, 0, 0, 2],
    ],
    author: "collin-b1",
    name: "Lock and Key",
    goal: { row: 2, column: 2 },
  },
  {
    startingConfiguration: [
      [0, 4, 4, 0, 0],
      [3, 2, 0, 0, 0],
      [0, 4, 0, 0, 0],
      [4, 0, 0, 0, 4],
      [4, 4, 0, 4, 2],
    ],
    author: "collin-b1",
    name: "Rubber Duck",
    goal: { column: 2, row: 2 },
  },
  {
    startingConfiguration: [
      [2, 4, 4, 0, 4, 4, 2],
      [4, 0, 0, 0, 0, 0, 4],
      [0, 4, 4, 0, 4, 4, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [4, 3, 0, 4, 0, 0, 4],
    ],
    author: "collin-b1",
    name: "Fountain",
    goal: { column: 3, row: 2 },
  },
  {
    startingConfiguration: [
      [0, 0, 2, 4, 0, 4, 0, 4, 0],
      [0, 0, 0, 0, 4, 0, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 4, 0, 0, 4, 0, 0],
      [4, 2, 4, 0, 4, 0, 4, 3, 4],
    ],
    author: "collin-b1",
    name: "Cavern 3",
    goal: { column: 4, row: 3 },
  },
];

const getLevelCount = (): number => {
  return levels.length;
};

const getLevel = (levelNumber: number): Readonly<GameLevel> => {
  return Object.freeze(levels[levelNumber]) || {};
};

export { getLevel, getLevelCount };
