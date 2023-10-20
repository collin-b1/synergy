import { ChangeEvent, useEffect, useState } from "react";
import Board from "@/components/Game/Board";
import { createEmptyConfiguration } from "@/utils/boardActions";
import { GridConfiguration } from "@/lib/types";

const LevelEditor: React.FC = () => {
  // Level Details
  const [sizeX, setSizeX] = useState<number>(5);
  const [sizeY, setSizeY] = useState<number>(5);
  const [author, setAuthor] = useState<string>("Anonymous");
  const [name, setName] = useState<string>("Untitled");
  const [configuration, setConfiguration] = useState<GridConfiguration>(
    createEmptyConfiguration(sizeX, sizeY)
  );

  useEffect(() => {
    setConfiguration(() => createEmptyConfiguration(sizeX, sizeY));
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
    setAuthor(e.target.value);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Board configuration={configuration} />
      <div className="mx-auto flex-1 w-full flex flex-col p-4">
        <h2 className="text-xl font-bold">Level Properties</h2>
        <label htmlFor="levelName">Level Name</label>
        <input
          type="text"
          name="levelName"
          value={name}
          onChange={handleChangeName}
        />
        <label htmlFor="levelAuthor">Author</label>
        <input
          type="text"
          name="levelAuthor"
          value={author}
          onChange={handleChangeAuthor}
        />
        <label htmlFor="sizeX">Grid Columns</label>
        <input
          type="number"
          name="sizeX"
          min={3}
          max={9}
          value={sizeX}
          onChange={handleChangeSizeX}
        />
        <label htmlFor="sizeY">Grid Rows</label>
        <input
          type="number"
          name="sizeY"
          min={3}
          max={9}
          value={sizeY}
          onChange={handleChangeSizeY}
        />
        <input type="button" value="Insert Player" />
      </div>
    </>
  );
};

export default LevelEditor;
