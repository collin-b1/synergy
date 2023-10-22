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
    goal: [{ column: 2, row: 2 }],
    author: "collin-b1",
    difficulty: 1,
    name: "Tutorial Level 1",
  },
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0],
      [2, 0, 2, 0, 0],
    ],
    goal: [{ column: 2, row: 2 }],
    author: "collin-b1",
    difficulty: 1,
    name: "Tutorial Level 2",
  },
];

const getLevel = (levelNumber: number): GameLevel => {
  return levels[levelNumber];
};

export { getLevel };
