import { ChangeEvent, useEffect, useState } from "react";
import Board from "@/components/Game/Board";
import {
  createEmptyConfiguration,
  decodeLevelString,
  encodeLevelString,
} from "@/utils/boardActions";
import { GameLevel, GridPosition } from "@/lib/types";
import Button from "../Button";
import { LEVEL } from "@/lib/constants";

interface LevelEditorProps {
  code: string | undefined;
}

const LevelEditor: React.FC<LevelEditorProps> = props => {
  // Level Details
  const [rows, setRows] = useState<number>(LEVEL.DEFAULT_ROWS);
  const [columns, setColumns] = useState<number>(LEVEL.DEFAULT_COLUMNS);
  const [selectedTile, setSelectedTile] = useState<GridPosition | null>(null);
  const [levelProperties, setLevelProperties] = useState<GameLevel>({
    startingConfiguration: createEmptyConfiguration(rows, columns),
    author: LEVEL.DEFAULT_AUTHOR,
    name: LEVEL.DEFAULT_NAME,
    goal: {
      row: LEVEL.DEFAULT_GOAL_ROW,
      column: LEVEL.DEFAULT_GOAL_COLUMN,
    },
  });

  const [shareLink, setShareLink] = useState<string>("");

  useEffect(() => {
    const code = encodeLevelString(levelProperties);
    setShareLink(`${window.location.href.split("editor")[0]}?code=${code}`);
  }, [levelProperties]);

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
      startingConfiguration: createEmptyConfiguration(columns, rows),
    }));
  }, [columns, rows]);

  const handleChangeColumns = (e: ChangeEvent<HTMLInputElement>) => {
    const columns: number = parseInt(e.target.value);
    if (columns >= LEVEL.MIN_COLUMNS && columns <= LEVEL.MAX_COLUMNS) {
      setColumns(columns);
    }
  };

  const handleChangeRows = (e: ChangeEvent<HTMLInputElement>) => {
    const rows: number = parseInt(e.target.value);
    if (rows >= LEVEL.MIN_ROWS && rows <= LEVEL.MAX_ROWS) {
      setRows(rows);
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
      <h1 className="text-white text-2xl font-bold text-center">
        Level Editor
      </h1>
      <div className="mb-2">
        <Board
          configuration={levelProperties.startingConfiguration}
          selectedTile={selectedTile}
          setSelectedTile={setSelectedTile}
          goal={levelProperties.goal || null}
        />
      </div>

      <div className="flex-1 flex flex-col mt-2">
        <h2 className="text-xl font-bold dark:text-white">Board Actions</h2>
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
        <div className="flex-1 flex mt-2">
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
                startingConfiguration: createEmptyConfiguration(columns, rows),
              })
            }
          >
            Reset
          </Button>
        </div>

        <h2 className="text-xl font-bold mt-4 dark:text-white">
          Level Properties
        </h2>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="levelName">Level Name</label>
            <input
              type="text"
              name="levelName"
              maxLength={LEVEL.MAX_NAME_LENGTH}
              value={levelProperties.name}
              onChange={handleChangeName}
              className="p-1 rounded border-b dark:bg-slate-800"
            />
          </div>
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="levelAuthor">Author</label>
            <input
              type="text"
              name="levelAuthor"
              maxLength={LEVEL.MAX_AUTHOR_LENGTH}
              value={levelProperties.author}
              onChange={handleChangeAuthor}
              className="p-1 rounded border-b dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              name="rows"
              min={LEVEL.MIN_ROWS}
              max={LEVEL.MAX_ROWS}
              value={rows}
              onChange={handleChangeRows}
              className="p-1 rounded border-b dark:bg-slate-800"
            />
          </div>
          <div className="flex-1 flex flex-col p-2">
            <label htmlFor="columns" className="flex-1">
              Columns
            </label>
            <input
              type="number"
              name="columns"
              min={LEVEL.MIN_COLUMNS}
              max={LEVEL.MAX_COLUMNS}
              value={columns}
              onChange={handleChangeColumns}
              className="p-1 rounded border-b dark:bg-slate-800"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4 dark:text-white">Share</h2>
        <input
          value={shareLink}
          onClick={e => e.currentTarget.select()}
          className="mt-2 p-1 rounded border-b dark:bg-slate-800"
        />
      </div>
    </div>
  );
};

export default LevelEditor;
