import { GridPosition } from "@/lib/types";

interface TileProps {
  posX: number;
  posY: number;
  value: number;
  selected: boolean;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
}

const tileColors = ["bg-gray-300", "bg-gray-400", "bg-gray-600", "bg-red-500"];

const Tile = (props: TileProps) => {
  const handleClick = () => {
    props.setSelectedTile(() => {
      return props.selected ? null : { column: props.posX, row: props.posY };
    });
  };

  return (
    <div
      className={`${tileColors[props.value] || tileColors[0]} ${
        props.selected ? "border-4 border-blue-500" : ""
      } p-4`}
      onClick={handleClick}
      role="gridcell"
    ></div>
  );
};

export default Tile;
