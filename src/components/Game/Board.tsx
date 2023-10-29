import type { GridConfiguration, GridPosition } from "@/lib/types";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import { getDestinationTiles, moveTile } from "@/utils/boardActions";

interface BoardProps {
  configuration: GridConfiguration;
  selectedTile: GridPosition | null;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
  handleMove?: () => void;
  handleLevelWin?: () => void;
  wonLevel?: boolean;
  goal: GridPosition | null;
}

const Board = (props: BoardProps) => {
  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );

  const handleMoveSelectedTile = (destination: GridPosition) => {
    if (props.selectedTile && !props.wonLevel) {
      const moved = moveTile(
        props.configuration,
        props.selectedTile,
        destination
      );
      if (
        moved.column === destination.column &&
        moved.row === destination.row
      ) {
        if (props.handleMove) props.handleMove();
        if (
          props.goal &&
          props.configuration[props.goal.row][props.goal.column] === 3
        ) {
          if (props.handleLevelWin) props.handleLevelWin();
          //window.alert("You win!\n(More satisfying win alert coming soon...)");
        }
      }
    }
  };

  useEffect(() => {
    setMoveDestinations(() =>
      props.selectedTile && !props.wonLevel
        ? getDestinationTiles(props.configuration, props.selectedTile)
        : []
    );
  }, [props.configuration, props.selectedTile, props.wonLevel]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.configuration[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${props.configuration.length}, 1fr)`,
      }}
      className={`grid select-none gap-1`}
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
