import { GridConfiguration, GridPosition } from "@/lib/types";
import { useEffect, useState } from "react";
import Tile from "./Tile";

interface BoardProps {
  configuration: GridConfiguration;
}

const Board = (props: BoardProps) => {
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    props.configuration
  );
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);

  useEffect(() => {
    setConfiguration(() => props.configuration);
  }, [props.configuration]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.configuration[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${props.configuration.length}, 1fr)`,
      }}
      className={`flex-1 gap-0.5 grid max-w-lg aspect-square`}
      role="grid"
    >
      {configuration.map((row, y) =>
        row.map((val, x) => (
          <Tile
            posX={x}
            posY={y}
            value={val}
            selected={
              (selectedTile || false) &&
              selectedTile.column === x &&
              selectedTile.row === y
            }
            setSelectedTile={setSelectedTile}
            key={x * y + x}
          />
        ))
      )}
    </div>
  );
};

export default Board;
