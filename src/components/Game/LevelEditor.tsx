import { ChangeEvent, useState } from "react";
import Board from "./Board";

const LevelEditor: React.FC = () => {
  // Level Details
  const [sizeX, setSizeX] = useState<number>(7);
  const [sizeY, setSizeY] = useState<number>(7);
  const [author, setAuthor] = useState<string>("Anonymous");
  const [name, setName] = useState<string>("Untitled");

  const handleChangeSizeX = (e: ChangeEvent<HTMLInputElement>) => {
    setSizeX(+e.target.value);
  };

  const handleChangeSizeY = (e: ChangeEvent<HTMLInputElement>) => {
    setSizeY(+e.target.value);
  };

  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Board sizeX={sizeX} sizeY={sizeY} />

      <div className="flex flex-col p-4">
        <label htmlFor="levelName" className="font-bold">
          Level Name
        </label>
        <input
          type="text"
          name="levelName"
          value={name}
          onChange={handleChangeName}
        />
        <label htmlFor="levelAuthor" className="font-bold">
          Author
        </label>
        <input
          type="text"
          name="levelAuthor"
          value={author}
          onChange={handleChangeAuthor}
        />
        <label htmlFor="sizeX" className="font-bold">
          Grid Columns
        </label>
        <input
          type="number"
          name="sizeX"
          min={3}
          max={9}
          value={sizeX}
          onChange={handleChangeSizeX}
        />
        <label htmlFor="sizeY" className="font-bold">
          Grid Rows
        </label>
        <input
          type="number"
          name="sizeY"
          min={3}
          max={9}
          value={sizeY}
          onChange={handleChangeSizeY}
        />
      </div>
    </>
  );
};

export default LevelEditor;
