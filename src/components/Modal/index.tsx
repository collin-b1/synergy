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
          "absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50 text-center",
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
