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
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 4, 0, 4],
      [2, 0, 3, 0, 4, 0, 4],
      [2, 0, 0, 0, 4, 0, 4],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    goal: { column: 2, row: 2 },
    author: "collin-b1",
    difficulty: 1,
    name: "Tutorial - Sticky Zones",
  }),
];

const getLevel = (levelNumber: number): GameLevel => {
  return levels[levelNumber] || {};
};

export { getLevel };
