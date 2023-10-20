import { useEffect, useState } from "react";
import { getLevel } from "@/api";
import Board from "./Board";
import { GameLevel } from "@/lib/types";
import { createEmptyConfiguration } from "@/utils/boardActions";

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
      <header className="text-center mb-4">
        <h2 className="font-bold text-lg">{levelProperties.name}</h2>
        <h3>by {levelProperties.author}</h3>
      </header>

      <div className="flex flex-1 justify-center">
        <Board configuration={levelProperties.startingConfiguration} />
      </div>
    </>
  );
};

export default Game;
