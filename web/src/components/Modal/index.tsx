"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function Modal({
  title,
  body,
  isOpen,
  setIsOpen,
}: {
  title?: string;
  body: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const verifyIfSameElement = (event: any) => {
    setIsOpen(!(event.target === ref.current));
  };

  return isOpen ? (
    <>
      <div className="overflow-hidden fixed inset-0 w-screen h-screen flex justify-center items-center z-[9999] bg-black opacity-50" />
      <div
        ref={ref}
        onClick={(event: any) => verifyIfSameElement(event)}
        className="fixed inset-0 w-screen h-screen flex justify-center items-center z-[99999]"
      >
        <section
          className={`
            text-slate-200 flex flex-col max-w-md max-h-[Calc(100%_-_15rem)] rounded-xl 
            bg-gradient-to-tr from-rose-900 via-indigo-900 to-rose-950 shadow-darker
            `}
        >
          <header className="relative py-4 px-6">
            {title && (
              <h1 className="text-center font-extrabold text-3xl">{title}</h1>
            )}
            <CloseButton closeFunction={setIsOpen} />
          </header>
          <div className="overflow-y-auto">
            <p className="px-8">{body}</p>
          </div>
          <div className="flex justify-end gap-3 py-4 px-8">
            <CancelButton cancelFunction={setIsOpen} />
            <ConfirmButton />
          </div>
        </section>
      </div>
    </>
  ) : null;
}

const CloseButton = ({
  color,
  size,
  closeFunction,
}: {
  color?: string;
  size?: string;
  closeFunction: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => closeFunction(false)}
      className="absolute top-1/2 -translate-y-1/2 right-[24px]"
    >
      <motion.svg
        stroke="currentColor"
        fill="transparent"
        stroke-width="35"
        viewBox="0 0 512 512"
        className={`
          ${!color ? "text-crimson" : color} ${!size ? "text-2xl" : size}`}
        height="1.25em"
        width="1.25em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{
            // repeat: Infinity,
            // repeatType: "mirror",
            ease: "easeInOut",
            from: 0,
            repeatDelay: 0,
            duration: 4,
            delay: 0,
          }}
          d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"
        />
      </motion.svg>
    </button>
  );
};

const CancelButton = ({
  cancelFunction,
}: {
  cancelFunction: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => cancelFunction(false)}
      className="text-crimson font-extrabold"
    >
      Cancelar
    </button>
  );
};

const ConfirmButton = () => {
  return (
    <motion.button
      type="button"
      className="font-extrabold py-2 px-3 rounded-xl outline-none bg-blue-700"
      whileTap={{ scale: 0.9 }}
      onClick={() => console.log("Confirmar")}
    >
      Confirmar
    </motion.button>
  );
};
