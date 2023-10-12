import { BoardConfiguration } from "@/lib/types";

export const generalizeBoardArray = (board: BoardConfiguration): string => {
  return board.map(b => b.join("")).join("");
};
