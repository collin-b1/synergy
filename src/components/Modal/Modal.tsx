import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  isShown: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
};

export const Modal: React.FC<ModalProps> = ({
  isShown,
  children,
  ...props
}) => {
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
      {...props}
    >
      <div className="rounded border bg-slate-200 p-8 shadow-xl dark:border-slate-500 dark:bg-slate-800 sm:py-4">
        {children}
      </div>
    </div>
  );
};
