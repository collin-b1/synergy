import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  className?: string;
}

export const Button: React.FC<ButtonProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge(
        clsx(
          "rounded-lg border-b border-solid border-slate-400 bg-slate-300",
          "px-4 py-2 shadow-xl transition hover:shadow-md active:shadow-none",
          "disabled:bg-slate-400 disabled:drop-shadow-none",
          "dark:border dark:border-slate-600 dark:bg-transparent dark:text-slate-300",
          "dark:disabled:border-dashed dark:disabled:bg-transparent dark:disabled:shadow-none",
          className
        )
      )}
    >
      {children}
    </button>
  );
};
