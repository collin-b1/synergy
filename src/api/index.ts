import { GameLevel } from "@/lib/types";

const levels: Array<GameLevel> = [
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3],
    ],
    goal: { column: 2, row: 2 },
    author: "collin-b1",
    difficulty: 1,
    name: "Tutorial - Moving Player",
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0],
      [2, 0, 0, 2, 0],
    ],
    goal: { column: 2, row: 2 },
    author: "collin-b1",
    difficulty: 1,
    name: "Tutorial - Moving Objects",
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [4, 0, 0, 0, 4, 0, 0],
      [0, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    author: "collin-b1",
    name: "Tutorial - Sticky Zones",
    goal: { column: 3, row: 3 },
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
    name: "Untitled",
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
      [0, 4, 2, 0, 0, 4, 0],
      [0, 4, 0, 0, 0, 4, 0],
      [0, 4, 0, 0, 0, 4, 0],
      [0, 0, 0, 4, 0, 0, 0],
      [0, 2, 0, 3, 0, 0, 0],
    ],
    author: "collin-b1",
    name: "Cactus",
    goal: { column: 3, row: 2 },
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

const getLevel = (levelNumber: number): GameLevel => {
  return Object.freeze(levels[levelNumber]) || {};
};

export { getLevel, getLevelCount };
