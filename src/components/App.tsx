import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { Game } from "@/components/Game";
import { LevelEditor } from "@/components/LevelEditor";
import { Link } from "@/components/Link";

function App() {
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  return (
    <>
      <main className="mx-auto mt-4 flex flex-row">
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
      <footer className="mx-auto max-w-md p-2">
        <nav>
          <ul className="flex text-center">
            <li className="flex-1">
              {pathname !== "/" ? (
                <Link to="/" className="text-blue-500 hover:underline">
                  Home
                </Link>
              ) : (
                <Link to="/editor" className="text-blue-500 hover:underline">
                  Editor
                </Link>
              )}
            </li>
            <li className="flex-1">
              <Link
                to="https://github.com/collin-b1/synergy#game-objective"
                className="text-blue-500 hover:underline"
              >
                How to Play
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to="https://github.com/collin-b1/synergy"
                className="text-blue-500 hover:underline"
              >
                Source
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default App;
