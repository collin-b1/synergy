import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface LinkProps {
  href: string;
  text: string;
}

export const Button: React.FC<LinkProps> = props => {
  return (
    <a
      href={props.href}
      className={twMerge(
        clsx("text-blue-500", "hover:underline", "active:text-blue-800")
      )}
    >
      {props.text}
    </a>
  );
};

export default Button;
