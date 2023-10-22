import { useEffect, useState } from "react";
import { getLevel } from "@/api";
import Board from "./Board";
import { GameLevel, GridConfiguration } from "@/lib/types";
import { createEmptyConfiguration } from "@/utils/boardActions";
import Button from "../Button";

const Game: React.FC = () => {
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  // These properties do not change except for per level
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    difficulty: 1,
    startingConfiguration: createEmptyConfiguration(5, 5),
    author: "Anonymous",
    name: "Unnamed Level",
  });

  // This is the board state that gets changed
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    structuredClone(levelProperties.startingConfiguration)
  );

  useEffect(() => {
    setLevelProperties(() => getLevel(levelNumber));
    setAttempts(0);
  }, [levelNumber]);

  useEffect(() => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
  }, [levelProperties.startingConfiguration]);

  const handleNextLevel = () => {
    setLevelNumber(num => num + 1);
  };

  const handlePreviousLevel = () => {
    setLevelNumber(num => num - 1);
  };

  const handleRestartLevel = () => {
    setConfiguration(structuredClone(levelProperties.startingConfiguration));
    setAttempts(attempts => attempts + 1);
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center">
        <header className="flex-1 text-center mb-4 flex items-center">
          <div className="flex-1">
            <h2 className="font-bold text-lg">{levelProperties.name}</h2>
            <h3>by {levelProperties.author}</h3>
          </div>
        </header>
        <main className="mb-4">
          <Board
            configuration={configuration}
            setConfiguration={setConfiguration}
            goal={levelProperties.goal}
            key={attempts}
          />
        </main>
        <footer className="flex-1 flex items-center">
          <Button onClick={handlePreviousLevel} disabled={levelNumber === 0}>
            ◄
          </Button>
          <div className="flex-1 flex justify-center">
            <Button onClick={handleRestartLevel} className="flex-1">
              Restart Level {attempts > 0 ? `(${attempts})` : ""}
            </Button>
          </div>
          <Button onClick={handleNextLevel} disabled={levelNumber === 2}>
            ►
          </Button>
        </footer>
      </div>
    </>
  );
};

export default Game;
