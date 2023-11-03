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
    <div className={`flex flex-col`} role="grid">
      {board.map((rows, row) => (
        <div className="my-0.5 flex flex-1">
          {rows.map((val, column) => (
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
          ))}
        </div>
      ))}
    </div>
  );
};
