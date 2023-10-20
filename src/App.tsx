import Game from "./components/Game/Game";
//import LevelEditor from "./components/LevelEditor/LevelEditor";

function App() {
  return (
    <>
      <main className="max-w-5xl flex flex-col mx-auto p-4">
        <Game />
        <footer className="mt-4 p-4 max-w-md mx-auto">
          <h2 className="text-center font-bold">How to Play</h2>
          <ul className="list-disc">
            <li>
              The goal is to move the{" "}
              <span className="text-red-500">player </span>
              to the <span className="text-gray-500">hole </span>
            </li>
            <li>
              The player can only move in a direction where they will run into
              an obstacle
            </li>
            <li>Objects can be moved in the same way as the player</li>
          </ul>
        </footer>
      </main>
    </>
  );
}

export default App;
