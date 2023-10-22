import Game from "./Game/Game";
import Link from "./Link";

function App() {
  return (
    <>
      <main className="max-w-lg flex flex-row mx-auto p-4 text-slate-800">
        <Game />
      </main>
      <footer className="mt-4 p-4 max-w-md mx-auto">
        <h2 className="text-center font-bold">How to Play</h2>
        <ul className="list-disc mb-4">
          <li>
            The goal is to move the{" "}
            <span className="text-red-500">player </span>
            to the <span className="text-gray-500">hole </span>
          </li>
          <li>
            The player can only move in a direction where they will run into an
            obstacle
          </li>
          <li>Objects can be moved in the same way as the player</li>
        </ul>
        <ul className="flex text-center">
          <li className="flex-1">
            <Link
              href="https://github.com/collin-b1/synergy"
              text="Level Editor"
            />
          </li>
          <li className="flex-1">
            <Link href="https://github.com/collin-b1/synergy" text="Source" />
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
