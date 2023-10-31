import type { GridConfiguration, GridPosition } from "@/types";
import { Tile } from "@/components/Game";

interface BoardProps {
  configuration: GridConfiguration;
  moveDestinations?: Array<GridPosition> | null;
  hardMode?: boolean;
  selectedTile: GridPosition | null;
  setSelectedTile: React.Dispatch<React.SetStateAction<GridPosition | null>>;
  handleMoveSelectedTile?: (destination: GridPosition) => void;
  goal: GridPosition | null;
}

export const Board: React.FC<BoardProps> = props => {
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
            isDestination={
              props.moveDestinations?.filter(
                obj => obj.row === y && obj.column === x
              ).length !== 0
            }
            selected={
              (props.selectedTile || false) &&
              props.selectedTile.column === x &&
              props.selectedTile.row === y
            }
            hardMode={props.hardMode}
            handleMoveSelectedTile={props.handleMoveSelectedTile}
            setSelectedTile={props.setSelectedTile}
            key={x + y * row.length}
          />
        ))
      )}
    </div>
  );
};
