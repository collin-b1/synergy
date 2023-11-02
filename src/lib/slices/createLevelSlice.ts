import { getLevels } from "@/api";
import { GameLevel } from "@/types";
import { StateCreator } from "zustand";

export interface LevelSlice {
  levels: GameLevel[];
  getLevels: () => void;
}

export const createLevelSlice: StateCreator<LevelSlice> = set => ({
  levels: [],

  /** @todo Create a backend for levels */
  getLevels: () => {
    const res = getLevels();
    set({ levels: res });
  },
});
