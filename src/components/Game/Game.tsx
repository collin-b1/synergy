import { useEffect, useState } from "react";

import { GameHeader } from "@/components/GameHeader";
import { Board } from "@/components/Game";
import { Modal, WinModal, SettingsModal } from "@/components/Modal";
import { ControlBar } from "@/components/ControlBar";

import { GameLevel, type GridPosition } from "@/types";
import { getDestinationTiles } from "@/utils";
import { useSynergyStore } from "@/lib/store";

interface GameProps {
  loadedLevel: GameLevel | undefined;
}

type ModalScreen = "win" | "settings" | null;

export const Game: React.FC<GameProps> = props => {
  const { getLevels, setLevel, level, levels, board, hasWon, selected } =
    useSynergyStore();

  const [moveDestinations, setMoveDestinations] = useState<Array<GridPosition>>(
    []
  );
  const [levelNumber, setLevelNumber] = useState<number>(0); // -1: user level, >=0: default levels
  const [modal, setModal] = useState<ModalScreen>(null);

  // Load user level or default levels if no level is provided
  useEffect(() => {
    if (!props.loadedLevel) {
      getLevels();
    } else {
      if (props.loadedLevel !== undefined) {
        setLevelNumber(-1);
        setLevel(props.loadedLevel);
      }
    }
  }, [getLevels, props.loadedLevel, setLevel]);

  // Set the level whenever the level number updates
  useEffect(() => {
    if (levelNumber >= 0 && levelNumber < levels.length) {
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
  }, [hasWon]);

  const handleClickModal: React.MouseEventHandler = e => {
    // Only exit if clicked parent
    if (e.target === e.currentTarget) {
      if (modal !== null) {
        setModal(() => null);
      }
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center rounded-lg p-4 dark:bg-slate-800">
      <GameHeader handleClickSettings={() => setModal("settings")} />
      <div className="relative mb-4">
        <Board board={board} moveDestinations={moveDestinations} />
        <Modal isShown={modal !== null} onClick={handleClickModal}>
          {modal === "win" && <WinModal />}
          {modal === "settings" && <SettingsModal />}
        </Modal>
      </div>
      <ControlBar levelNumber={levelNumber} setLevelNumber={setLevelNumber} />
    </div>
  );
};
