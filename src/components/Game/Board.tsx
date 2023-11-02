import type { GridConfiguration, GridPosition } from "@/types";
import { Tile } from "@/components/Game";
import { useSynergyStore } from "@/lib/store";

interface BoardProps {
  board: GridConfiguration;
  moveDestinations?: Array<GridPosition>;
}

export const Board: React.FC<BoardProps> = ({ board, moveDestinations }) => {
  const goal = useSynergyStore(state => state.level.goal);
  const selected = useSynergyStore(state => state.selected);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${board.length}, 1fr)`,
      }}
      className={`grid select-none grid-flow-dense gap-1`}
      role="grid"
    >
      {board.map((rows, row) =>
        rows.map((val, column) => (
          <Tile
            value={val}
            isGoal={
              goal !== undefined && goal.row === row && goal.column === column
            }
            isSelected={
              selected !== null &&
              selected.row === row &&
              selected.column === column
            }
            isDestination={
              moveDestinations !== undefined &&
              moveDestinations.some(
                dest => dest.row === row && dest.column === column
              )
            }
            row={row}
            column={column}
            key={column + row * rows.length}
          />
        ))
      )}
    </div>
  );
};
