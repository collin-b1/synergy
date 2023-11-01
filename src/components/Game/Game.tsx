import { useEffect, useState } from "react";
import { getLevel, getLevelCount } from "@/api";
import { Board } from "@/components/Game";
import { Modal, ModalScreen } from "@/components/Modal";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import {
  Tile,
  type GameLevel,
  type GridConfiguration,
  type GridPosition,
  type LevelStats,
  UserSettings,
} from "@/types";
import {
  createEmptyConfiguration,
  decodeLevelString,
  getDestinationTiles,
  moveTile,
} from "@/utils/board";
import { LEVEL } from "@/constants";

interface GameProps {
  code: string | undefined;
}

type ModalScreen = "win" | "settings" | null;

export const Game: React.FC<GameProps> = props => {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    hardMode: false,
    saveGameData: false,
  });
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [levelCount, setLevelCount] = useState<number>(0);
  const [levelStats, setLevelStats] = useState<LevelStats>({
    completed: false,
    attempts: 0,
    moves: [],
    time: 0,
  });
  const [modal, setModal] = useState<ModalScreen>(null);
  // These properties do not change except for per level
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    startingConfiguration: createEmptyConfiguration(
      LEVEL.DEFAULT_ROWS,
      LEVEL.DEFAULT_COLUMNS
    ),
    author: LEVEL.DEFAULT_AUTHOR,
    name: LEVEL.DEFAULT_NAME,
  });
  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );

  // This is the board state that gets changed
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    structuredClone(levelProperties.startingConfiguration)
  );

  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);

  useEffect(() => {
    setMoveDestinations(() =>
      selectedTile && !levelStats.completed
        ? getDestinationTiles(configuration, selectedTile)
        : []
    );
  }, [configuration, selectedTile, levelStats.completed, levelProperties.goal]);

  useEffect(() => {
    setLevelCount(() => getLevelCount());
  }, []);

  useEffect(() => {
    const code = props.code;
    if (code === undefined) {
      if (levelNumber != -1) {
        setLevelProperties(() => getLevel(levelNumber));
      }
    } else {
      const level: GameLevel | undefined = decodeLevelString(code);
      if (level !== undefined) {
        setLevelNumber(-1);
        setLevelProperties(() => level);
      }
    }
  }, [levelNumber, props.code]);

  useEffect(() => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
  }, [levelProperties.startingConfiguration]);

  const handleRestartLevel = () => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
    const attempts = levelStats.attempts;
    resetLevelStats();
    setLevelStats(stats => ({
      ...stats,
      attempts: attempts + 1,
    }));
  };

  const resetLevelStats = () => {
    setLevelStats({
      attempts: 0,
      completed: false,
      moves: [],
      time: 0,
    });
    if (modal === "win") {
      setModal(() => null);
    }
    setSelectedTile(() => null);
  };

  const handleClickModal: React.MouseEventHandler = e => {
    // Only exit if clicked parent
    if (e.target === e.currentTarget) {
      if (modal !== null) {
        setModal(() => null);
      }
    }
  };

  const handleMoveSelectedTile = (destination: GridPosition) => {
    if (selectedTile && !levelStats.completed) {
      const moved = moveTile(configuration, selectedTile, destination);
      if (moved !== null) {
        setConfiguration(moved);
        setLevelStats(stats => ({
          ...stats,
          moves: [...stats.moves, [selectedTile, destination]],
        }));

        if (
          levelProperties.goal &&
          moved[levelProperties.goal.row][levelProperties.goal.column] ===
            Tile.PLAYER
        ) {
          setLevelStats(stats => ({
            ...stats,
            completed: true,
          }));
          setModal("win");
        }
      }
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center rounded-lg p-4 dark:bg-slate-800">
        <div className="mb-4 flex flex-1 items-center">
          <div className="flex-1">
            {levelProperties.name && (
              <h2 className="text-xl font-bold dark:text-white">
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
          <Button className="m-2" onClick={() => setModal("settings")}>
            <span role="img" aria-label="settings">
              ⚙️
            </span>
          </Button>
        </div>
        <div className="relative mb-4">
          <Board
            configuration={configuration}
            hardMode={userSettings.hardMode}
            moveDestinations={moveDestinations}
            goal={levelProperties.goal || null}
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
            handleMoveSelectedTile={handleMoveSelectedTile}
          />
          <Modal isShown={modal !== null} onClick={handleClickModal}>
            {modal === "win" && (
              <ModalScreen>
                <h2 className="mb-4 text-2xl font-bold dark:text-white">
                  Congratulations!
                </h2>
                <p className="">
                  You solved{" "}
                  <span className="font-bold">{levelProperties.name}</span> in
                </p>
                <div className="flex flex-col py-4">
                  <span className="flex-1 text-2xl font-bold dark:text-white">
                    Moves: {levelStats.moves.length}
                  </span>
                  <span className="flex-1 text-2xl font-bold dark:text-white">
                    Retries: {levelStats.attempts}
                  </span>
                </div>
              </ModalScreen>
            )}
            {modal === "settings" && (
              <ModalScreen>
                <h2 className="mb-4 text-xl font-bold dark:text-white">
                  Settings
                </h2>
                <div className="flex p-2">
                  <Toggle
                    toggled={userSettings.hardMode}
                    name="hardMode"
                    handleClick={() =>
                      setUserSettings(settings => ({
                        ...settings,
                        hardMode: !settings.hardMode,
                      }))
                    }
                  />
                  <label htmlFor="hardMode" className="pl-4">
                    Hard Mode
                  </label>
                </div>
              </ModalScreen>
            )}
          </Modal>
        </div>
        <div className="flex flex-1 items-center">
          <Button
            onClick={() => {
              resetLevelStats();
              setLevelNumber(num => num - 1);
            }}
            disabled={levelNumber === 0 || levelNumber === -1}
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
            onClick={() => {
              resetLevelStats();
              setLevelNumber(num => num + 1);
            }}
            disabled={levelNumber === levelCount - 1 || levelNumber === -1}
          >
            ▷
          </Button>
        </div>
      </div>
    </>
  );
};
