import { create } from "zustand";
import { LevelSlice, createLevelSlice } from "./slices/createLevelSlice";
import { GameSlice, createGameSlice } from "./slices/createGameSlice";

type StoreState = GameSlice & LevelSlice;

export const useSynergyStore = create<StoreState>((...a) => ({
  ...createLevelSlice(...a),
  ...createGameSlice(...a),
}));
