import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useSynergyStore } from "@/lib/store";
import CONSTANTS from "@/constants";
import { Tile as TileValue } from "@/types";

interface TileProps {
  value: TileValue;
  row: number;
  column: number;
  isGoal: boolean;
  isDestination: boolean;
  isSelected: boolean;
  isPlayerAdjacent?: boolean;
}

export const Tile = (props: TileProps) => {
  const { row, column } = props;

  const setSelectedTile = useSynergyStore(state => state.selectTile);
  const moveSelected = useSynergyStore(state => state.moveSelected);
  const hardMode = useSynergyStore(state => state.hardMode);

  const handleSelectTile = () => {
    if (!props.isDestination) {
      if (props.isSelected) {
        setSelectedTile(null);
      } else {
        setSelectedTile({ row, column });
      }
    } else {
      moveSelected({ row, column });
    }
  };

  return (
    <button
      className={twMerge(
        clsx(
          "mx-0.5 aspect-square flex-1 rounded transition-[ring] delay-0 ease-linear active:ring-2 motion-reduce:transition-none",
          CONSTANTS.TILE_COLORS.get(props.value),
          {
            "ring-4 ring-blue-500 ring-inset": props.isSelected,
            "flex justify-center items-center": props.isDestination,
            "ring-2 ring-purple-600": props.isGoal,
            "bg-blue-800":
              props.value === TileValue.POWERED &&
              !hardMode &&
              !props.isPlayerAdjacent,
            "bg-portal bg-cover":
              props.isGoal && props.value === TileValue.EMPTY,
          }
        )
      )}
      onClick={handleSelectTile}
      role="gridcell"
    >
      {!hardMode && props.isDestination ? (
        <div
          className={twMerge(
            clsx(
              "absolute rounded-full bg-black/25 p-2 backdrop-blur-lg dark:bg-white/25",
              { "bg-black dark:bg-black": props.isGoal }
            )
          )}
        ></div>
      ) : (
        <></>
      )}
    </button>
  );
};
