import { GridPosition } from "@/types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { TileColors } from "@/constants";
import { Tile as TileValue } from "@/types";

interface TileProps {
  posX: number;
  posY: number;
  value: number;
  selected: boolean;
  isGoal: boolean;
  isDestination: boolean;
  hardMode?: boolean;
  handleMoveSelectedTile?: (destination: GridPosition) => void;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
}

export const Tile = (props: TileProps) => {
  const handleClick = () => {
    props.setSelectedTile(() => {
      if (
        props.handleMoveSelectedTile &&
        props.isDestination &&
        !props.selected
      ) {
        props.handleMoveSelectedTile({ row: props.posY, column: props.posX });
      } else if (props.selected) {
        return null;
      }
      return { row: props.posY, column: props.posX };
    });
  };

  return (
    <button
      className={twMerge(
        clsx(
          "aspect-square rounded transition-[ring] delay-0 ease-linear active:ring-2 motion-reduce:transition-none",
          TileColors.get(props.value),
          {
            "ring-4 ring-blue-500 ring-inset": props.selected,
            "flex justify-center items-center": props.isDestination,
            "ring-2 ring-purple-600": props.isGoal,
            "bg-portal bg-cover":
              props.isGoal && props.value === TileValue.EMPTY,
          }
        )
      )}
      onClick={handleClick}
      role="gridcell"
    >
      {props.isDestination && !props.hardMode ? (
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
