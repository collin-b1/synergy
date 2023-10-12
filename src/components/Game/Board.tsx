import { GridPosition } from "@/lib/types";
import { useState } from "react";

interface BoardProps {
  sizeX: number;
  sizeY: number;
}

interface TileProps {
  posX: number;
  posY: number;
  selected: boolean;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
}

const Tile = (props: TileProps) => {
  const handleClick = () => {
    props.setSelectedTile(() => {
      return props.selected ? null : { column: props.posX, row: props.posY };
    });
  };

  return (
    <div
      className={`${
        props.selected ? "border-4 border-blue-500" : ""
      } bg-gray-300 p-4`}
      onClick={handleClick}
      role="gridcell"
    ></div>
  );
};

const Board = (props: BoardProps) => {
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.sizeX}, 1fr)`,
        gridTemplateRows: `repeat(${props.sizeY}, 1fr)`,
      }}
      className={`flex-1 gap-0.5 grid max-w-lg aspect-square`}
      role="grid"
    >
      {Array.from({ length: props.sizeY }, (_, kr) =>
        Array.from({ length: props.sizeX }, (_, kc) => (
          <Tile
            posX={kc}
            posY={kr}
            selected={
              (selectedTile || false) &&
              selectedTile.column === kc &&
              selectedTile.row === kr
            }
            setSelectedTile={setSelectedTile}
            key={kr * kc + kc}
          />
        ))
      )}
    </div>
  );
};

export default Board;
