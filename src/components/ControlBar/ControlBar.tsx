import { Button } from "@/components/Button";
import { useSynergyStore } from "@/lib/store";

interface ControlBarProps {
  levelNumber: number;
  setLevelNumber: (val: React.SetStateAction<number>) => void;
}

export const ControlBar: React.FC<ControlBarProps> = props => {
  const hardMode = useSynergyStore(state => state.hardMode);
  const moves = useSynergyStore(state => state.moves);
  const totalLevels = useSynergyStore(state => state.levels.length);
  const restarts = useSynergyStore(state => state.restarts);
  const hasWon = useSynergyStore(state => state.hasWon);

  const undo = useSynergyStore(state => state.undo);
  const restart = useSynergyStore(state => state.restart);

  return (
    <div className="flex flex-1 items-center">
      <Button
        onClick={() => {
          props.setLevelNumber(level => level - 1);
        }}
        disabled={props.levelNumber <= 0}
      >
        ◁
      </Button>
      <div className="flex flex-1 justify-center">
        <Button
          disabled={hardMode || moves.length === 0}
          className={"mr-2"}
          onClick={undo}
        >
          Undo
        </Button>
        <Button disabled={moves.length === 0} onClick={restart}>
          Restart {restarts > 0 ? `(${restarts})` : ""}
        </Button>
      </div>
      <Button
        onClick={() => {
          props.setLevelNumber(level => level + 1);
        }}
        disabled={
          (hardMode && !hasWon) ||
          props.levelNumber === totalLevels - 1 ||
          props.levelNumber < 0
        }
      >
        ▷
      </Button>
    </div>
  );
};
