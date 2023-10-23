import { useEffect, useState } from "react";
import { getLevel, getLevelCount } from "@/api";
import Board from "./Board";
import { GameLevel, GridConfiguration, GridPosition } from "@/lib/types";
import {
  createEmptyConfiguration,
  decodeLevelString,
} from "@/utils/boardActions";
import Button from "../Button";

interface GameProps {
  code: string | undefined;
}

const Game: React.FC<GameProps> = props => {
  const [levelNumber, setLevelNumber] = useState<number>(0);
  const [levelCount, setLevelCount] = useState<number>(0);
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

  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [isUserLevel, setIsUserLevel] = useState<boolean>(false);

  useEffect(() => {
    setLevelCount(() => getLevelCount());
  }, []);

  useEffect(() => {
    const { code } = props;
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

    setSelectedTile(() => null);
    setAttempts(0);
  }, [levelNumber, props, props.code]);

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
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto p-2">
        <div className="flex-1 text-center mb-4 flex items-center">
          <div className="flex-1">
            <h2 className="font-bold text-lg">{levelProperties.name}</h2>
            <h3>by {levelProperties.author}</h3>
          </div>
        </div>
        <div className="mb-4">
          <Board
            configuration={configuration}
            goal={levelProperties.goal || null}
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
            key={attempts}
          />
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
              Restart Level {attempts > 0 ? `(${attempts})` : ""}
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
