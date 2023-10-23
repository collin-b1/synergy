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
          "drop-shadow hover:drop-shadow-md active:drop-shadow-none",
          "rounded transition",
          "bg-slate-300 border-b border-solid border-slate-400",
          "disabled:bg-slate-400 disabled:drop-shadow-none",
          props.className
        )
      )}
    >
      {children}
    </button>
  );
};

export default Button;