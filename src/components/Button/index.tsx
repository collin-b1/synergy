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
  const { children, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge(
        clsx(
          "px-4 py-2",
          "shadow-xl hover:shadow-md active:shadow-none",
          "rounded-lg transition border-b border-solid",
          "bg-slate-300  border-slate-400",
          "dark:bg-transparent dark:border-slate-600 dark:text-slate-300 dark:border",
          "disabled:bg-slate-400 disabled:drop-shadow-none ",
          "dark:disabled:border-dashed dark:disabled:bg-transparent dark:disabled:shadow-none",
          props.className
        )
      )}
    >
      {children}
    </button>
  );
};

export default Button;
