import { GameLevel } from "@/types";

export const encodeLevelString = (level: GameLevel): string | undefined => {
  try {
    const str = JSON.stringify(level);
    return btoa(str);
  } catch (e) {
    return undefined;
  }
};

export const decodeLevelString = (code: string): GameLevel | undefined => {
  try {
    const decoded = atob(code);
    const level: GameLevel = JSON.parse(decoded);
    return level;
  } catch (e) {
    return undefined;
  }
};
