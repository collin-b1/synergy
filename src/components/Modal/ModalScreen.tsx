interface ModalScreenProps extends React.HTMLProps<HTMLDivElement> {}

const ModalScreen: React.FC<ModalScreenProps> = ({ ...props }) => {
  const { children, ...rest } = props;

  return (
    <div
      className="rounded border bg-slate-200 p-4 shadow-xl dark:border-slate-500 dark:bg-slate-800 sm:px-12 sm:py-4"
      {...rest}
    >
      {children}
    </div>
  );
};

export default ModalScreen;
