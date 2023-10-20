import { GameLevel } from "@/lib/types";

const levels: Array<GameLevel> = [
  {
    startingConfiguration: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2],
      [0, 2, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3],
    ],
    author: "collin-b1",
    difficulty: 1,
    name: "Humble Beginnings",
  },
];

const getLevel = (levelNumber: number): GameLevel => {
  return levels[levelNumber];
};

export { getLevel };
