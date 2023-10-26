import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  isShown?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isShown, ...props }) => {
  const { children, ...rest } = props;

  return (
    <div
      className={twMerge(
        clsx(
          "absolute top-0 left-0 z-10",
          "flex justify-center items-center",
          "w-full h-full bg-gray-800/50 text-center",
          {
            hidden: !isShown,
          }
        )
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Modal;
