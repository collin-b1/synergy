import { useEffect, useState } from "react";
import { getLevel, getLevelCount } from "@/api";
import Board from "./Board";
import type {
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
    if (levelStats.completed) {
      setLevelStats(stats => ({
        ...stats,
        time: 0,
      }));
      setShowModal(() => true);
      /*console.log(
        `Level won in ${levelStats.attempts} attempts and ${levelStats.moves} moves.`
      );*/
    }
  }, [levelStats.completed]);

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
      <div className="mx-auto flex max-w-lg flex-1 flex-col justify-center rounded-lg p-4 dark:bg-slate-800">
        <div className="mb-4 flex flex-1 items-center text-center">
          <div className="flex-1">
            {levelProperties.name && (
              <h2 className="text-lg font-bold dark:text-white">
                {levelProperties.name}
              </h2>
            )}
            {levelProperties.author && (
              <h3 className="text-ellipsis">by {levelProperties.author}</h3>
            )}
            {levelProperties.description && (
              <p className="text-sm">{levelProperties.description}</p>
            )}
          </div>
        </div>
        <div className="relative mb-4">
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
            <div className="rounded border bg-slate-200 p-4 shadow-xl dark:border-slate-500 dark:bg-slate-800 sm:px-12 sm:py-4">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Congratulations!
              </h2>
              <p className="">
                You solved{" "}
                <span className="font-bold">{levelProperties.name}</span> in
              </p>
              <div className="flex flex-col py-4">
                <span className="flex-1 text-2xl font-bold dark:text-white">
                  Moves: {levelStats.moves}
                </span>
                <span className="flex-1 text-2xl font-bold dark:text-white">
                  Retries: {levelStats.attempts}
                </span>
              </div>
              <p className="text-sm">Click anywhere to exit</p>
            </div>
          </Modal>
        </div>
        <div className="flex flex-1 items-center">
          <Button
            onClick={handlePreviousLevel}
            disabled={levelNumber === 0 || isUserLevel}
          >
            ◁
          </Button>
          <div className="flex flex-1 justify-center">
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
