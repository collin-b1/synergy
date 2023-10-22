import { GridConfiguration, GridPosition } from "@/lib/types";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import { getDestinationTiles } from "@/utils/boardActions";

interface BoardProps {
  configuration: GridConfiguration;
}

const Board = (props: BoardProps) => {
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    props.configuration
  );
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );

  useEffect(() => {
    setConfiguration(() => props.configuration);
  }, [props.configuration]);

  useEffect(() => {
    if (selectedTile) {
      setMoveDestinations(() =>
        getDestinationTiles(props.configuration, selectedTile)
      );
    }
  }, [props.configuration, selectedTile]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.configuration[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${props.configuration.length}, 1fr)`,
      }}
      className={`gap-1 grid aspect-square`}
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
            moveDestinations={moveDestinations}
            setSelectedTile={setSelectedTile}
            key={x * y + x}
          />
        ))
      )}
    </div>
  );
};

export default Board;
