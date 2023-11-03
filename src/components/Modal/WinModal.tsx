import { useSynergyStore } from "@/lib/store";
import { Button } from "@/components/Button";

interface WinModalProps {
  levelNumber: number;
  handleNextLevel: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  levelNumber,
  handleNextLevel,
}) => {
  const levelName = useSynergyStore(state => state.level.name);
  const numMoves = useSynergyStore(state => state.moves.length);
  const restarts = useSynergyStore(state => state.restarts);
  const totalLevels = useSynergyStore(state => state.levels.length);

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        Congratulations!
      </h2>
      <p>
        You solved <span className="font-bold">{levelName}</span> in
      </p>
      <div className="flex flex-col py-4">
        <span className="flex-1 text-2xl font-bold dark:text-white">
          Moves: {numMoves}
        </span>
        <span className="flex-1 text-2xl font-bold dark:text-white">
          Retries: {restarts}
        </span>
      </div>
      {levelNumber < totalLevels - 1 && levelNumber >= 0 ? (
        <Button onClick={handleNextLevel}>Next Level</Button>
      ) : (
        <></>
      )}
    </>
  );
};
