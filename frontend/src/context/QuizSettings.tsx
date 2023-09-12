"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface QuizSettingsContextProps {}

const QuizSettingsContext = createContext<QuizSettingsContextProps>(
  {} as QuizSettingsContextProps
);

export const QuizSettingsProvider = ({ children }: any) => {
  return (
    <QuizSettingsContext.Provider value={{}}>
      {children}
    </QuizSettingsContext.Provider>
  );
};

export default QuizSettingsContext;
export const QuizSettingsConsumer = QuizSettingsContext.Consumer;
