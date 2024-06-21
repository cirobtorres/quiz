"use client";

import { createContext, useState } from "react";

interface DarkModeContextProps {
  theme: string;
  setTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps>(
  {} as DarkModeContextProps
);

export function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [theme, switchTheme] = useState("");

  const setTheme = () => {
    switchTheme(theme === "dark" ? "" : "dark");
  };

  return (
    <DarkModeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
