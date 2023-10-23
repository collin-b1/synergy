import { GridPosition } from "@/lib/types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

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

const tileColors = [
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-600",
  "bg-red-400",
  "bg-green-400",
];

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
    <div
      className={twMerge(
        clsx(
          "aspect-square rounded hover:border-4 active:border-4 transition-[border] ease-linear delay-0",
          tileColors[props.value],
          {
            "border-4 border-blue-500": props.selected,
            "flex justify-center items-center": isDestination,
            "bg-portal bg-cover ": props.isGoal && props.value === 0,
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
    </div>
  );
};

export default Tile;
