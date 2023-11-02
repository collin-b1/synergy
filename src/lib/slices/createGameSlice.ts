import { GameLevel, GridConfiguration, GridPosition } from "@/types";
import { createEmptyConfiguration, hasWon, moveTile } from "@/utils";
import { StateCreator } from "zustand";
import CONSTANTS from "@/constants";

export interface Game {
  level: GameLevel;
  board: GridConfiguration;
  selected: GridPosition | null;
  hasWon: boolean;
  hardMode: boolean;
  moves: Array<[GridPosition, GridPosition]>;
  restarts: number;
}

export interface GameSlice extends Game {
  setLevel: (level: GameLevel) => void;
  selectTile: (pos: GridPosition) => void;
  moveSelected: (to: GridPosition) => void;
  overrideGoal: (pos: GridPosition) => void;
  toggleHardMode: () => void;
  undo: () => void;
  restart: () => void;
}

const defaultBoardConfiguration = createEmptyConfiguration(
  CONSTANTS.LEVEL.DEFAULT_ROWS,
  CONSTANTS.LEVEL.DEFAULT_COLUMNS
);

export const createGameSlice: StateCreator<GameSlice> = (set, get) => ({
  level: {
    startingConfiguration: defaultBoardConfiguration,
    author: CONSTANTS.LEVEL.DEFAULT_AUTHOR,
    name: CONSTANTS.LEVEL.DEFAULT_NAME,
    goal: {
      row: CONSTANTS.LEVEL.DEFAULT_GOAL_ROW,
      column: CONSTANTS.LEVEL.DEFAULT_GOAL_COLUMN,
    },
  },
  selected: null,
  board: defaultBoardConfiguration,
  hasWon: false,
  hardMode: false,
  moves: [],
  restarts: 0,
  setLevel: (level: GameLevel) => {
    if (level !== undefined) {
      set(state => ({
        ...state,
        level,
        selected: null,
        board: level.startingConfiguration,
        restarts: 0,
        hasWon: false,
        moves: [],
      }));
    }
  },
  selectTile: (pos: GridPosition | null) => set({ selected: pos }),
  moveSelected: (to: GridPosition) => {
    const selectedTile = get().selected;
    if (selectedTile) {
      const newBoard = moveTile(get().board, selectedTile, to);
      if (newBoard !== null) {
        const goal = get().level.goal;
        set(state => ({
          board: newBoard,
          selected: to,
          moves: [...state.moves, [selectedTile, to]],
          hasWon: goal && hasWon(newBoard, goal),
        }));
      }
    }
  },
  overrideGoal: (pos: GridPosition) => {
    set(state => ({
      ...state,
      level: {
        ...state.level,
        goal: pos,
      },
    }));
  },
  toggleHardMode: () => {
    set(state => ({ hardMode: !state.hardMode }));
  },
  restart: () => {
    set(state => ({
      board: state.level.startingConfiguration,
      restarts: state.restarts + 1,
      selected: null,
      hasWon: false,
      moves: [],
    }));
  },
  undo: () => {
    const undo = get().moves.pop();
    if (undo) {
      const moves = get().moves;
      let newBoard: GridConfiguration = get().level.startingConfiguration;
      for (const move of moves) {
        if (newBoard) {
          const updatedBoard = moveTile(newBoard, move[0], move[1]);
          if (updatedBoard) {
            newBoard = updatedBoard;
          }
        }
      }
      set({
        board: newBoard,
        selected: undo[0],
        hasWon: false,
        moves,
      });
    }
  },
});
