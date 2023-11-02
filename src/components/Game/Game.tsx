import { useEffect, useState } from "react";
import { Board } from "@/components/Game";
import { Modal, ModalScreen } from "@/components/Modal";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { type GridPosition } from "@/types";
import { decodeLevelString, getDestinationTiles } from "@/utils";
import { useSynergyStore } from "@/lib/store";

interface GameProps {
  code: string | undefined;
}

export const Game: React.FC<GameProps> = props => {
  const {
    getLevels,
    setLevel,
    restart,
    undo,
    toggleHardMode,
    level,
    levels,
    board,
    hardMode,
    moves,
    hasWon,
    restarts,
    selected,
  } = useSynergyStore();

  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );
  const [levelNumber, setLevelNumber] = useState<number>(0); // -1: user level, >=0: default levels
  const [modal, setModal] = useState<null | "win" | "settings">(null);

  // Load user level or default levels if no level code is provided
  useEffect(() => {
    const code = props.code;
    if (!code) {
      getLevels();
    } else {
      const level = decodeLevelString(code);
      if (level !== undefined) {
        setLevelNumber(-1);
        setLevel(level);
      }
    }
  }, [getLevels, props.code, setLevel]);

  // Set the level whenever the level number updates
  useEffect(() => {
    if (levelNumber <= levels.length) {
      setLevel(levels[levelNumber]);
    }
  }, [levels, levelNumber, setLevel]);

  // Update destination tiles list whenever selected tile or level gets changed
  useEffect(() => {
    setMoveDestinations(() =>
      selected && !(level.goal && hasWon)
        ? getDestinationTiles(board, selected)
        : []
    );
  }, [selected, board, level, hasWon]);

  // Show win screen if the level is completed
  useEffect(() => {
    if (hasWon) {
      setModal("win");
    } else {
      setModal(null);
    }
  }, [hasWon, moves]);

  const handleClickModal: React.MouseEventHandler = e => {
    // Only exit if clicked parent
    if (e.target === e.currentTarget) {
      if (modal !== null) {
        setModal(() => null);
      }
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center rounded-lg p-4 dark:bg-slate-800">
        <div className="mb-4 flex flex-1 items-center">
          <div className="flex-1">
            {level.name && (
              <h2 className="text-xl font-bold dark:text-white">
                {level.name}
              </h2>
            )}
            {level.author && (
              <h3 className="text-ellipsis">by {level.author}</h3>
            )}
            {level.description && (
              <p className="text-sm">{level.description}</p>
            )}
          </div>
          <Button className="m-2" onClick={() => setModal("settings")}>
            <span role="img" aria-label="settings">
              ⚙️
            </span>
          </Button>
        </div>
        <div className="relative mb-4">
          <Board board={board} moveDestinations={moveDestinations} />
          <Modal isShown={modal !== null} onClick={handleClickModal}>
            {modal === "win" && (
              <ModalScreen>
                <h2 className="mb-4 text-2xl font-bold dark:text-white">
                  Congratulations!
                </h2>
                <p className="">
                  You solved <span className="font-bold">{level.name}</span> in
                </p>
                <div className="flex flex-col py-4">
                  <span className="flex-1 text-2xl font-bold dark:text-white">
                    Moves: {moves.length}
                  </span>
                  <span className="flex-1 text-2xl font-bold dark:text-white">
                    Retries: {restarts}
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
                    toggled={hardMode}
                    name="hardMode"
                    handleClick={toggleHardMode}
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
              setLevelNumber(num => num - 1);
            }}
            disabled={levelNumber <= 0}
          >
            ◁
          </Button>
          <div className="flex flex-1 justify-center">
            <Button disabled={hardMode || moves.length === 0} onClick={undo}>
              Undo
            </Button>
            <Button onClick={restart}>
              Restart {restarts > 0 ? `(${restarts})` : ""}
            </Button>
          </div>
          <Button
            onClick={() => {
              setLevelNumber(num => num + 1);
            }}
            disabled={levelNumber === levels.length - 1 || levelNumber === -1}
          >
            ▷
          </Button>
        </div>
      </div>
    </>
  );
};
