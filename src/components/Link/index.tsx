import { Link } from "react-router-dom";

export interface LinkProps {
  href: string;
  text?: string;
}

export const Button: React.FC<LinkProps> = props => {
  return (
    <Link
      to={props.href}
      className={"text-blue-500 hover:underline active:text-blue-800"}
    >
      {props.text || props.href}
    </Link>
  );
};

export default Button;
