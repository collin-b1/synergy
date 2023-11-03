import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { Game } from "@/components/Game";
import { Link } from "@/components/Link";
import { Editor } from "@/components/Editor";
import { useEffect, useState } from "react";
import { decodeLevelString } from "@/utils";
import { GameLevel } from "@/types";

function App() {
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  const [loadedLevel, setLoadedLevel] = useState<GameLevel | undefined>(
    undefined
  );

  // If a user level is provided in parameters, decode
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const level = decodeLevelString(code);
      setLoadedLevel(level);
    }
  }, [searchParams]);

  return (
    <>
      <main className="mx-auto mt-4 flex flex-row">
        <Routes>
          <Route path="/" element={<Game loadedLevel={loadedLevel} />} />
          {
            <Route
              path="/editor"
              element={<Editor loadedLevel={loadedLevel} />}
            />
          }
        </Routes>
      </main>
      <footer className="mx-auto max-w-md p-2">
        <nav>
          <ul className="flex text-center">
            <li className="flex-1">
              {pathname !== "/" ? (
                <Link
                  to="/"
                  state={{ loadedLevel }}
                  className="text-blue-500 hover:underline"
                >
                  Play
                </Link>
              ) : (
                <Link
                  to="/editor"
                  state={{ loadedLevel }}
                  className="text-blue-500 hover:underline"
                >
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
