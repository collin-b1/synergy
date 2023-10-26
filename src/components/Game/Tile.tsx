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
  handleMoveSelectedTile: (destination: GridPosition) => void;
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
      if (isDestination && !props.selected) {
        props.handleMoveSelectedTile({ row: props.posY, column: props.posX });
      } else if (!props.selected) {
        return { column: props.posX, row: props.posY };
      }
      return null;
    });
  };

  return (
    <button
      className={twMerge(
        clsx(
          "aspect-square rounded hover:border-4 active:border-4 transition-[border] ease-linear delay-0 motion-reduce:transition-none",
          TileColors.get(props.value),
          {
            "border-4 border-blue-500": props.selected,
            "flex justify-center items-center": isDestination,
<<<<<<< HEAD
            "bg-portal bg-cover ":
=======
            "bg-portal bg-cover":
>>>>>>> dc6e1d5a3819668dbf18f9a6c61cdea44d13849c
              props.isGoal && props.value === TileValue.EMPTY,
          }
        )
      )}
      onClick={handleClick}
      role="gridcell"
    >
      {isDestination ? (
        <div className="absolute p-1 sm:p-2 rounded-full bg-gray-500/30 backdrop-blur-lg"></div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Tile;
