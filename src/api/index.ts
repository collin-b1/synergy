import { GameLevel } from "@/lib/types";

const levels: Array<GameLevel> = [
  Object.freeze({
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
  }),
  Object.freeze({
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
  }),
  Object.freeze({
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
  }),
  Object.freeze({
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
  }),
  Object.freeze({
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
  }),
];

const getLevelCount = (): number => {
  return levels.length;
};

const getLevel = (levelNumber: number): GameLevel => {
  return levels[levelNumber] || {};
};

export { getLevel, getLevelCount };
