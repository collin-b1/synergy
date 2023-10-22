import { GridPosition } from "@/lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface TileProps {
  posX: number;
  posY: number;
  value: number;
  selected: boolean;
  moveDestinations: Array<GridPosition>;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
}

const tileColors = ["bg-gray-300", "bg-gray-400", "bg-gray-600", "bg-red-400"];

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
      return props.selected ? null : { column: props.posX, row: props.posY };
    });
  };

  return (
    <div
      className={clsx(
        "p-4 rounded hover:border-4 active:border-4 transition-[border] ease-linear delay-0",
        tileColors[props.value],
        {
          "border-4 border-blue-500": props.selected,
          "flex justify-center items-center": isDestination,
        }
      )}
      onClick={handleClick}
      role="gridcell"
    >
      {isDestination ? (
        <div className="w-4 h-4 rounded-full bg-gray-700 mix-blend-overlay"></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tile;
