import { useEffect, useState } from "react";
import { getLevel } from "@/api";
import Board from "./Board";
import { GameLevel } from "@/lib/types";
import { createEmptyConfiguration } from "@/utils/boardActions";
import Button from "../Button";

const Game: React.FC = () => {
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    difficulty: 1,
    startingConfiguration: createEmptyConfiguration(5, 5),
    author: "Anonymous",
    name: "Unnamed Level",
  });

  useEffect(() => {
    setLevelProperties(() => getLevel(0));
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center">
        <header className="flex-1 text-center mb-4 flex items-center">
          <Button>Previous</Button>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{levelProperties.name}</h2>
            <h3>by {levelProperties.author}</h3>
          </div>
          <Button>Next</Button>
        </header>
        <main>
          <Board configuration={levelProperties.startingConfiguration} />
        </main>
      </div>
    </>
  );
};

export default Game;
