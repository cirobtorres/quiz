"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import CloseButton from "../CloseButton";

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

  const clickOutsideClosing = (event: React.MouseEvent) => {
    if (event.target === ref.current) setIsOpen(false);
  };

  return isOpen ? (
    <>
      <div className="overflow-hidden fixed inset-0 w-screen h-screen flex justify-center items-center z-[9999] bg-black opacity-50" />
      <div
        ref={ref}
        onClick={(event: any) => clickOutsideClosing(event)}
        className="fixed inset-0 w-screen h-screen flex justify-center items-center z-[99999]"
      >
        <section
          className={`
            text-slate-200 flex flex-col max-w-lg max-h-[Calc(100%_-_15rem)] rounded-xl 
            bg-gradient-to-tr from-rose-900 via-indigo-900 to-rose-950 shadow-darker z-[999999]
            `}
        >
          <header className="relative flex items-center gap-2 py-4 my-4">
            {title && (
              <h1
                className={`
                  [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] pl-8
                  text-center text-3xl font-extrabold leading-9 max-h-18 overflow-hidden text-ellipsis 
                `}
              >
                {title}
              </h1>
            )}
            <CloseButton closeFunction={setIsOpen} />
          </header>
          <div
            className={`
            overflow-y-auto scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
            hover:scrollbar-thumb-red-500 active:scrollbar-thumb-red-400 scrollbar-thumb-blue-700 scrollbar-track-transparent 
            `}
          >
            <p className="px-8">{body}</p>
          </div>
          <div className="flex justify-end gap-3 py-4 px-8">
            <CancelButton text="Cancelar" cancelFunction={setIsOpen} />
            <ConfirmButton text="Confirmar" />
          </div>
        </section>
      </div>
    </>
  ) : null;
}

const CancelButton = ({
  text,
  cancelFunction,
}: {
  text: string;
  cancelFunction: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => cancelFunction(false)}
      className="text-crimson font-extrabold"
    >
      {text}
    </button>
  );
};

const ConfirmButton = ({ text }: { text: string }) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      className="text-white font-extrabold py-2 px-3 rounded-xl outline-none bg-blue-700"
      onClick={() => console.log("Confirmar")}
    >
      {text}
    </motion.button>
  );
};
