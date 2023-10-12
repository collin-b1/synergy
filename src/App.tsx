import LevelEditor from "./components/Game/LevelEditor";

function App() {
  return (
    <>
      <header className="my-4">
        <h1 className="text-center text-2xl">Synergy Level Editor</h1>
      </header>
      <main className="max-w-5xl mx-auto flex">
        <LevelEditor />
      </main>
    </>
  );
}

export default App;
