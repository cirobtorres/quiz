"use client";

import { createContext, useState } from "react";

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string | null;
  setTitle: (value: string) => void;
  body: string | null;
  setBody: (value: string) => void;
  confirmAction: (inputFunction: () => void) => void;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export function ModalProvider(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);

  const confirmAction = (inputFunction: () => void) => {
    inputFunction();
  };

  return (
    <ModalContext.Provider
      value={{
        title,
        setTitle,
        body,
        setBody,
        isOpen,
        setIsOpen,
        confirmAction,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
