import { ChangeEvent, useEffect, useState } from "react";
import Board from "@/components/Game/Board";
import {
  createEmptyConfiguration,
  decodeLevelString,
  encodeLevelString,
} from "@/utils/boardActions";
import { GameLevel, GridPosition } from "@/lib/types";
import Button from "../Button";

interface LevelEditorProps {
  code: string | undefined;
}

const LevelEditor: React.FC<LevelEditorProps> = props => {
  // Level Details
  const [sizeX, setSizeX] = useState<number>(5);
  const [sizeY, setSizeY] = useState<number>(5);
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    startingConfiguration: createEmptyConfiguration(sizeX, sizeY),
    author: "Anonymous",
    name: "Untitled",
    goal: { row: 2, column: 2 },
  });

  useEffect(() => {
    const { code } = props;
    if (code !== undefined) {
      const level: GameLevel | undefined = decodeLevelString(code);
      if (level) {
        setLevelProperties(() => level);
      }
    }
  }, [props]);

  useEffect(() => {
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      startingConfiguration: createEmptyConfiguration(sizeX, sizeY),
    }));
  }, [sizeX, sizeY]);

  const validateValue = (val: number) => val <= 9 && val >= 3;

  const handleChangeSizeX = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (validateValue(val)) {
      setSizeX(val);
    }
  };

  const handleChangeSizeY = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    if (validateValue(val)) {
      setSizeY(val);
    }
  };

  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      author: e.target.value,
    }));
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      name: e.target.value,
    }));
  };

  const setGoal = (tile: GridPosition | null) => {
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      goal: tile,
    }));
  };

  const insertTile = (tile: GridPosition, tileType: number) => {
    const newConfig = [...levelProperties.startingConfiguration];
    newConfig[tile.row][tile.column] = tileType;
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      startingConfiguration: [...newConfig],
    }));
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto p-2">
      <div className="mb-4">
        <Board
          configuration={levelProperties.startingConfiguration}
          selectedTile={selectedTile}
          setSelectedTile={setSelectedTile}
          goal={levelProperties.goal || null}
        />
      </div>

      <div className="flex-1 flex flex-col mt-4">
        <h2 className="text-xl font-bold">Board Actions</h2>
        <div className="flex flex-col sm:flex-row">
          <Button
            className="mt-1 mr-0 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, 3)}
          >
            Player
          </Button>
          <Button
            className="mt-1 mr-0 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, 2)}
          >
            Obstacle
          </Button>
          <Button
            className="mt-1 mr-0 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, 4)}
          >
            Sticky
          </Button>
          <Button
            className="mt-1 mr-0 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && setGoal(selectedTile)}
          >
            Goal
          </Button>
          <Button
            className="mt-1 mr-0 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, 0)}
          >
            Delete
          </Button>
        </div>

        <h2 className="text-xl font-bold mt-4">Level Properties</h2>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="levelName">Level Name</label>
            <input
              type="text"
              name="levelName"
              value={levelProperties.name}
              onChange={handleChangeName}
              className="p-1 rounded border-b"
            />
          </div>
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="levelAuthor">Author</label>
            <input
              type="text"
              name="levelAuthor"
              value={levelProperties.author}
              onChange={handleChangeAuthor}
              className="p-1 rounded border-b"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="sizeX" className="flex-1">
              Columns
            </label>
            <input
              type="number"
              name="sizeX"
              min={3}
              max={9}
              value={sizeX}
              onChange={handleChangeSizeX}
              className="p-1 rounded border-b"
            />
          </div>
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="sizeY">Rows</label>
            <input
              type="number"
              name="sizeY"
              min={3}
              max={9}
              value={sizeY}
              onChange={handleChangeSizeY}
              className="p-1 rounded border-b"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">Actions</h2>
        <div className="flex-1 flex">
          <Button
            className="bg-blue-400 mr-1"
            onClick={() =>
              window.alert(
                `${
                  window.location.href.split("/editor")[0]
                }/?code=${encodeLevelString(levelProperties)}`
              )
            }
          >
            Share
          </Button>
          <Button
            className="bg-blue-400 mr-1"
            onClick={() => window.alert(JSON.stringify(levelProperties))}
          >
            Export
          </Button>
          <Button
            className="bg-red-400 mr-1"
            onClick={() =>
              setLevelProperties({
                ...levelProperties,
                startingConfiguration: createEmptyConfiguration(sizeX, sizeY),
              })
            }
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevelEditor;
