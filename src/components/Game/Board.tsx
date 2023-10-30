import type { GridConfiguration, GridPosition } from "@/lib/types";
import Tile from "./Tile";

interface BoardProps {
  configuration: GridConfiguration;
  moveDestinations?: Array<GridPosition> | null;
  hardMode?: boolean;
  selectedTile: GridPosition | null;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
  handleMoveSelectedTile?: (destination: GridPosition) => void;
  goal: GridPosition | null;
}

const Board = (props: BoardProps) => {
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
            moveDestinations={props.moveDestinations || []}
            hardMode={props.hardMode}
            handleMoveSelectedTile={props.handleMoveSelectedTile}
            setSelectedTile={props.setSelectedTile}
            key={x * y + x}
          />
        ))
      )}
    </div>
  );
};

export default Board;
