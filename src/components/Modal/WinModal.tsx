import { useSynergyStore } from "@/lib/store";

export const WinModal = () => {
  const levelName = useSynergyStore(state => state.level.name);
  const numMoves = useSynergyStore(state => state.moves.length);
  const restarts = useSynergyStore(state => state.restarts);

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        Congratulations!
      </h2>
      <p className="">
        You solved <span className="font-bold">{levelName}</span> in
      </p>
      <div className="flex flex-col py-4">
        <span className="flex-1 text-2xl font-bold dark:text-white">
          Moves: {numMoves}
        </span>
        <span className="flex-1 text-2xl font-bold dark:text-white">
          Retries: {restarts}
        </span>
      </div>
    </>
  );
};
