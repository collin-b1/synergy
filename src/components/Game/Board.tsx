import { GridConfiguration, GridPosition } from "@/lib/types";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import { getDestinationTiles, moveTile } from "@/utils/boardActions";

interface BoardProps {
  configuration: GridConfiguration;
  setConfiguration: React.Dispatch<React.SetStateAction<GridConfiguration>>;
  goal?: GridPosition;
}

const Board = (props: BoardProps) => {
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );

  const handleMoveSelectedTile = (destination: GridPosition) => {
    if (selectedTile) {
      moveTile(props.configuration, selectedTile, destination);
    }
  };

  useEffect(() => {
    setSelectedTile(() => null);
  }, [props.configuration]);

  useEffect(() => {
    if (selectedTile) {
      setMoveDestinations(() =>
        getDestinationTiles(props.configuration, selectedTile)
      );
    } else {
      setMoveDestinations(() => []);
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
      {props.configuration.map((row, y) =>
        row.map((val, x) => (
          <Tile
            posX={x}
            posY={y}
            value={val}
            isGoal={
              props.goal
                ? props.goal.column === x && props.goal.row === y
                : false
            }
            selected={
              (selectedTile || false) &&
              selectedTile.column === x &&
              selectedTile.row === y
            }
            moveDestinations={moveDestinations}
            handleMoveSelectedTile={handleMoveSelectedTile}
            setSelectedTile={setSelectedTile}
            key={x * y + x}
          />
        ))
      )}
    </div>
  );
};

export default Board;
