import { GridPosition } from "@/lib/types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { TileColors } from "@/lib/constants";
import { Tile as TileValue } from "@/lib/types";

interface TileProps {
  posX: number;
  posY: number;
  value: number;
  selected: boolean;
  isGoal: boolean;
  moveDestinations: Array<GridPosition>;
  hardMode?: boolean;
  handleMoveSelectedTile?: (destination: GridPosition) => void;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
}

const Tile = (props: TileProps) => {
  const [isDestination, setIsDestination] = useState<boolean>(false);

  useEffect(() => {
    if (
      props.moveDestinations.filter(
        obj => obj.row === props.posY && obj.column === props.posX
      ).length !== 0
    ) {
      setIsDestination(true);
    } else {
      setIsDestination(false);
    }
  }, [props.posX, props.posY, props.moveDestinations]);

  const handleClick = () => {
    props.setSelectedTile(() => {
      if (props.handleMoveSelectedTile && isDestination && !props.selected) {
        props.handleMoveSelectedTile({ row: props.posY, column: props.posX });
      } else if (!props.selected) {
        return { column: props.posX, row: props.posY };
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
            "flex justify-center items-center": isDestination,
            "ring-2 ring-purple-600": props.isGoal,
            "bg-portal bg-cover":
              props.isGoal && props.value === TileValue.EMPTY,
          }
        )
      )}
      onClick={handleClick}
      role="gridcell"
    >
      {isDestination && !props.hardMode ? (
        <div
          className={twMerge(
            clsx(
              "absolute rounded-full bg-black/25 p-1 backdrop-blur-lg dark:bg-white/25 sm:p-2",
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

export default Tile;
