import { useSynergyStore } from "@/lib/store";
import { Button } from "@/components/Button";

interface GameHeaderProps {
  handleClickSettings: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  handleClickSettings,
}) => {
  const { name, author, description } = useSynergyStore(state => state.level);

  return (
    <div className="mb-4 flex flex-1 items-center">
      <div className="flex-1">
        {name && <h2 className="text-xl font-bold dark:text-white">{name}</h2>}
        {author && <h3 className="text-ellipsis">by {author}</h3>}
        {description && <p className="text-sm">{description}</p>}
      </div>
      <Button className="m-2" onClick={handleClickSettings}>
        <span role="img" aria-label="settings">
          ⚙️
        </span>
      </Button>
    </div>
  );
};
