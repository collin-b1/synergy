import { useEffect, useState } from "react";
import { getLevel, getLevelCount } from "@/api";
import Board from "./Board";
import {
  GameLevel,
  GridConfiguration,
  GridPosition,
  LevelStats,
} from "@/lib/types";
import {
  createEmptyConfiguration,
  decodeLevelString,
} from "@/utils/boardActions";
import Button from "../Button";
import { LEVEL } from "@/lib/constants";
import Modal from "../Modal";

interface GameProps {
  code: string | undefined;
}

const Game: React.FC<GameProps> = props => {
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [levelCount, setLevelCount] = useState<number>(0);
  const [levelStats, setLevelStats] = useState<LevelStats>({
    completed: false,
    attempts: 0,
    moves: 0,
    time: 0,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  // These properties do not change except for per level
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    startingConfiguration: createEmptyConfiguration(
      LEVEL.DEFAULT_ROWS,
      LEVEL.DEFAULT_COLUMNS
    ),
    author: LEVEL.DEFAULT_AUTHOR,
    name: LEVEL.DEFAULT_NAME,
  });

  // This is the board state that gets changed
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    structuredClone(levelProperties.startingConfiguration)
  );

  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [isUserLevel, setIsUserLevel] = useState<boolean>(false);

  useEffect(() => {
    setLevelCount(() => getLevelCount());
  }, []);

  useEffect(() => {
    const code = props.code;
    if (code === undefined) {
      setIsUserLevel(false);
      setLevelProperties(() => getLevel(levelNumber));
    } else {
      const level: GameLevel | undefined = decodeLevelString(code);
      if (level !== undefined) {
        setIsUserLevel(true);
        setLevelProperties(() => level);
      }
    }
    resetLevelStats();
  }, [levelNumber, props.code]);

  useEffect(() => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
  }, [levelProperties.startingConfiguration]);

  const handleNextLevel = () => {
    resetLevelStats();
    setLevelNumber(num => num + 1);
  };

  const handlePreviousLevel = () => {
    resetLevelStats();
    setLevelNumber(num => num - 1);
  };

  const handleRestartLevel = () => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
    const attempts = levelStats.attempts;
    resetLevelStats();
    setLevelStats(stats => ({
      ...stats,
      attempts: attempts + 1,
    }));
  };

  function handleLevelWin() {
    setLevelStats(stats => ({
      ...stats,
      completed: true,
    }));
  }

  useEffect(() => {
    console.log("Winning pt 2...");
    if (levelStats.completed) {
      console.log("winning pt 3...");
      setLevelStats(stats => ({
        ...stats,
        time: 0,
      }));
      setShowModal(() => true);
      console.log(
        `Level won in ${levelStats.attempts} attempts and ${levelStats.moves} moves.`
      );
    }
  }, [levelStats.attempts, levelStats.completed, levelStats.moves]);

  const resetLevelStats = () => {
    setLevelStats({
      attempts: 0,
      completed: false,
      moves: 0,
      time: 0,
    });
    setShowModal(() => false);
    setSelectedTile(() => null);
  };

  function handleMove(): void {
    setLevelStats(stats => ({
      ...stats,
      moves: stats.moves + 1,
    }));
  }

  return (
    <>
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto p-2">
        <div className="flex-1 text-center mb-4 flex items-center">
          <div className="flex-1">
            <h2 className="font-bold text-lg">{levelProperties.name}</h2>
            <h3 className="overflow-ellipsis">by {levelProperties.author}</h3>
          </div>
        </div>
        <div className="mb-4 relative">
          <Board
            configuration={configuration}
            goal={levelProperties.goal || null}
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
            handleMove={handleMove}
            handleLevelWin={handleLevelWin}
            wonLevel={levelStats.completed}
            key={levelProperties.name}
          />
          <Modal isShown={showModal} onClick={() => setShowModal(false)}>
            <div className="bg-gray-100 p-4 sm:px-12 sm:py-4 rounded">
              <h2 className="font-bold text-2xl mb-4">Congratulations!</h2>
              <p className="">
                You solved{" "}
                <span className="font-bold">{levelProperties.name}</span> in
              </p>
              <div className="flex flex-col py-4">
                <span className="flex-1 font-bold text-2xl">
                  Moves: {levelStats.moves}
                </span>
                <span className="flex-1 font-bold text-2xl">
                  Retries: {levelStats.attempts}
                </span>
              </div>
              <p className="text-sm">
                <span className="text-gray-600">Click anywhere to exit</span>
              </p>
            </div>
          </Modal>
        </div>
        <div className="flex-1 flex items-center">
          <Button
            onClick={handlePreviousLevel}
            disabled={levelNumber === 0 || isUserLevel}
          >
            ◁
          </Button>
          <div className="flex-1 flex justify-center">
            <Button onClick={handleRestartLevel}>
              Restart Level{" "}
              {levelStats.attempts > 0 ? `(${levelStats.attempts})` : ""}
            </Button>
          </div>
          <Button
            onClick={handleNextLevel}
            disabled={levelNumber === levelCount - 1 || isUserLevel}
          >
            ▷
          </Button>
        </div>
      </div>
    </>
  );
};

export default Game;
