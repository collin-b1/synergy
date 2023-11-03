import { Toggle } from "@/components/Toggle";
import { useSynergyStore } from "@/lib/store";

export const SettingsModal: React.FC = () => {
  const hardMode = useSynergyStore(state => state.hardMode);
  const toggleHardMode = useSynergyStore(state => state.toggleHardMode);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold dark:text-white">Settings</h2>
      <div className="flex p-2">
        <Toggle
          toggled={hardMode}
          name="hardMode"
          handleClick={toggleHardMode}
        />
        <label htmlFor="hardMode" className="pl-4">
          Hard Mode
        </label>
      </div>
    </>
  );
};
