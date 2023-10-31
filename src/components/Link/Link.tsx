import clsx from "clsx";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={clsx("text-blue-500 hover:underline", className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
