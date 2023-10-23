import clsx from "clsx";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface LinkProps {
  href: string;
  text: string;
}

export const Button: React.FC<LinkProps> = props => {
  return (
    <Link
      to={props.href}
      className={twMerge(
        clsx("text-blue-500", "hover:underline", "active:text-blue-800")
      )}
    >
      {props.text}
    </Link>
  );
};

export default Button;
