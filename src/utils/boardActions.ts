import { GridConfiguration } from "@/lib/types";

export const createEmptyConfiguration = (
  sizeX: number,
  sizeY: number
): GridConfiguration => {
  return Array.from(Array(sizeY), () => Array(sizeX).fill(0));
};
