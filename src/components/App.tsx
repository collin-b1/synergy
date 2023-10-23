import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Link from "./Link";
import Game from "./Game/Game";
import LevelEditor from "./LevelEditor/LevelEditor";

function App() {
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  return (
    <>
      <main className="flex flex-row mx-auto mt-4 text-slate-800">
        <Routes>
          <Route
            path="/"
            element={<Game code={searchParams.get("code") || undefined} />}
          />
          <Route
            path="/editor"
            element={
              <LevelEditor code={searchParams.get("code") || undefined} />
            }
          />
        </Routes>
      </main>
      <footer className="p-4 max-w-md mx-auto">
        <ul className="flex text-center">
          <li className="flex-1">
            {pathname !== "/" ? (
              <Link href="/" text="Home" />
            ) : (
              <Link href="/editor" text="Editor" />
            )}
          </li>
          <li className="flex-1">
            <Link
              href="https://github.com/collin-b1/synergy#game-objective"
              text="How to Play"
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