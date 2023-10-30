interface ToggleProps extends React.HTMLProps<HTMLInputElement> {
  handleClick: () => void;
  toggled?: boolean;
}

const Toggle: React.FC<ToggleProps> = props => {
  const { toggled, handleClick, ...rest } = props;

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        onClick={handleClick}
        defaultChecked={toggled}
        {...rest}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-500 after:absolute after:left-[2px] after:top-[2px]  after:h-5  after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4  peer-focus:ring-blue-300"></div>
    </label>
  );
};

export default Toggle;
