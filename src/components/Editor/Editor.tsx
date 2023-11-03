import { ChangeEvent, useEffect, useState } from "react";
import { Board } from "@/components/Game";
import { createEmptyConfiguration, encodeLevelString } from "@/utils";

import { GameLevel, GridPosition, Tile } from "@/types";
import { Button } from "@/components/Button";
import CONSTANTS from "@/constants";
import { useSynergyStore } from "@/lib/store";
import { Link } from "react-router-dom";

interface EditorProps {
  loadedLevel: GameLevel | undefined;
}

export const Editor: React.FC<EditorProps> = props => {
  // Level Details
  const selectedTile = useSynergyStore(state => state.selected);
  const setLevel = useSynergyStore(state => state.setLevel);

  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    startingConfiguration: createEmptyConfiguration(
      CONSTANTS.LEVEL.DEFAULT_ROWS,
      CONSTANTS.LEVEL.DEFAULT_COLUMNS
    ),
    author: CONSTANTS.LEVEL.DEFAULT_AUTHOR,
    name: CONSTANTS.LEVEL.DEFAULT_NAME,
    goal: {
      row: CONSTANTS.LEVEL.DEFAULT_GOAL_ROW,
      column: CONSTANTS.LEVEL.DEFAULT_GOAL_COLUMN,
    },
  });

  const [shareLink, setShareLink] = useState<string>("");

  // Load preloaded level if present
  useEffect(() => {
    if (props.loadedLevel !== undefined) {
      setLevelProperties(props.loadedLevel);
    }
  }, [props]);

  // Update the level share code on level update
  useEffect(() => {
    const code = encodeLevelString(levelProperties);
    setShareLink(`${window.location.href.split("editor")[0]}?code=${code}`);
  }, [levelProperties]);

  // Update game store level to match level being edited
  useEffect(() => {
    setLevel(levelProperties);
  }, [levelProperties, setLevel]);

  const setStartingConfiguration = (rows: number, columns: number) => {
    setLevelProperties(levelProperties => ({
      ...levelProperties,
      startingConfiguration: createEmptyConfiguration(rows, columns),
    }));
  };

  const handleChangeColumns = (e: ChangeEvent<HTMLInputElement>) => {
    const columns: number = parseInt(e.target.value);
    if (
      columns >= CONSTANTS.LEVEL.MIN_COLUMNS &&
      columns <= CONSTANTS.LEVEL.MAX_COLUMNS
    ) {
      setStartingConfiguration(
        levelProperties.startingConfiguration.length,
        columns
      );
    }
  };

  const handleChangeRows = (e: ChangeEvent<HTMLInputElement>) => {
    const rows: number = parseInt(e.target.value);
    if (rows >= CONSTANTS.LEVEL.MIN_ROWS && rows <= CONSTANTS.LEVEL.MAX_ROWS) {
      setStartingConfiguration(
        rows,
        levelProperties.startingConfiguration[0].length
      );
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

  const setGoal = (tile: GridPosition) => {
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
    <div className="mx-auto flex max-w-lg flex-1 flex-col justify-center p-2">
      <h1 className="text-center text-2xl font-bold text-white">
        Level Editor
      </h1>
      <div className="mb-2 flex-1">
        <Board board={levelProperties.startingConfiguration} />
      </div>

      <div className="mt-2 flex flex-1 flex-col">
        <h2 className="text-xl font-bold dark:text-white">Board Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() =>
              selectedTile && insertTile(selectedTile, Tile.PLAYER)
            }
          >
            Player
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() =>
              selectedTile && insertTile(selectedTile, Tile.OBSTACLE)
            }
          >
            Obstacle
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, Tile.WALL)}
          >
            Wall
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() =>
              selectedTile && insertTile(selectedTile, Tile.STICKY)
            }
          >
            Sticky
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() =>
              selectedTile && insertTile(selectedTile, Tile.POWERED)
            }
          >
            Powered
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && setGoal(selectedTile)}
          >
            Goal
          </Button>
          <Button
            className="mr-0 mt-1 sm:mr-1 sm:mt-0"
            onClick={() => selectedTile && insertTile(selectedTile, Tile.EMPTY)}
          >
            Delete
          </Button>
        </div>
        <div className="mt-2 flex flex-1">
          <Button
            className="mr-1 bg-blue-400"
            onClick={() => window.alert(JSON.stringify(levelProperties))}
          >
            Export
          </Button>
          <Link to={shareLink} target={"_blank"}>
            <Button className="mr-1 bg-blue-400">Play</Button>
          </Link>
          <Button
            className="mr-1 bg-red-400"
            onClick={() =>
              setLevelProperties({
                ...levelProperties,
                startingConfiguration: createEmptyConfiguration(
                  levelProperties.startingConfiguration.length,
                  levelProperties.startingConfiguration[0].length
                ),
              })
            }
          >
            Reset
          </Button>
        </div>

        <h2 className="mt-4 text-xl font-bold dark:text-white">
          Level Properties
        </h2>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-1 flex-col p-2">
            <label htmlFor="levelName">Level Name</label>
            <input
              type="text"
              name="levelName"
              maxLength={CONSTANTS.LEVEL.MAX_NAME_LENGTH}
              defaultValue={levelProperties.name}
              onChange={handleChangeName}
              className="rounded border-b p-1 dark:bg-slate-800"
            />
          </div>
          <div className="flex flex-1 flex-col p-2">
            <label htmlFor="levelAuthor">Author</label>
            <input
              type="text"
              name="levelAuthor"
              maxLength={CONSTANTS.LEVEL.MAX_AUTHOR_LENGTH}
              defaultValue={levelProperties.author}
              onChange={handleChangeAuthor}
              className="rounded border-b p-1 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-1 flex-col p-2">
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              name="rows"
              min={CONSTANTS.LEVEL.MIN_ROWS}
              max={CONSTANTS.LEVEL.MAX_ROWS}
              defaultValue={levelProperties.startingConfiguration.length}
              onChange={handleChangeRows}
              className="rounded border-b p-1 dark:bg-slate-800"
            />
          </div>
          <div className="flex flex-1 flex-col p-2">
            <label htmlFor="columns" className="flex-1">
              Columns
            </label>
            <input
              type="number"
              name="columns"
              min={CONSTANTS.LEVEL.MIN_COLUMNS}
              max={CONSTANTS.LEVEL.MAX_COLUMNS}
              defaultValue={levelProperties.startingConfiguration[0].length}
              onChange={handleChangeColumns}
              className="rounded border-b p-1 dark:bg-slate-800"
            />
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold dark:text-white">Share</h2>
        <input
          defaultValue={shareLink}
          onClick={e => e.currentTarget.select()}
          className="mt-2 rounded border-b p-1 dark:bg-slate-800"
        />
      </div>
    </div>
  );
};
