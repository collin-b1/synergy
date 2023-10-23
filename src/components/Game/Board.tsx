import { GridConfiguration, GridPosition } from "@/lib/types";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import { getDestinationTiles, moveTile } from "@/utils/boardActions";

interface BoardProps {
  configuration: GridConfiguration;
  selectedTile: GridPosition | null;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
  goal: GridPosition | null;
}

const Board = (props: BoardProps) => {
  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );

  const handleMoveSelectedTile = (destination: GridPosition) => {
    if (props.selectedTile) {
      moveTile(props.configuration, props.selectedTile, destination);
      if (
        props.goal &&
        props.configuration[props.goal.row][props.goal.column] === 3
      ) {
        window.alert("You win!\n(More satisfying win alert coming soon...)");
      }
    }
  };

  useEffect(() => {
    setMoveDestinations(() =>
      props.selectedTile
        ? getDestinationTiles(props.configuration, props.selectedTile)
        : []
    );
  }, [props.configuration, props.selectedTile]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.configuration[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${props.configuration.length}, 1fr)`,
      }}
      className={`gap-1 grid`}
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
              (props.selectedTile || false) &&
              props.selectedTile.column === x &&
              props.selectedTile.row === y
            }
            moveDestinations={moveDestinations}
            handleMoveSelectedTile={handleMoveSelectedTile}
            setSelectedTile={props.setSelectedTile}
            key={x * y + x}
          />
        ))
      )}
    </div>
  );
};

export default Board;
