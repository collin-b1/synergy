interface ModalScreenProps extends React.HTMLProps<HTMLDivElement> {}

export const ModalScreen: React.FC<ModalScreenProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      className="rounded border bg-slate-200 p-4 shadow-xl dark:border-slate-500 dark:bg-slate-800 sm:px-12 sm:py-4"
      {...props}
    >
      {children}
    </div>
  );
};
