"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface QuizSettingsContextProps {
  questionarySize: number;
  questionaryTimer: number;
  questionarySubject: string;
  handleQuestionarySize: (value: number) => void;
  handleQuestionaryTimer: (value: number) => void;
  handleQuestionarySubject: (value: string) => void;
  questionarySettings: {
    questionarySizeRange: number[];
    questionaryTimerRange: number[];
  };
}

const QuizSettingsContext = createContext<QuizSettingsContextProps>(
  {} as QuizSettingsContextProps
);

export const QuizSettingsProvider = ({ children }: any) => {
  const [questionarySize, setQuestionarySize] = useState<number>(10);
  const [questionaryTimer, setQuestionaryTimer] = useState<number>(30);
  const [questionarySubject, setQuestionarySubject] = useState<string>("all");
  const [minQuestions, maxQuestions]: number[] = [5, 30];
  const [minTime, maxTime]: number[] = [25, 90];

  function handleQuestionarySize(value: number): void {
    Cookies.set("questionarySize", value.toString());
  }

  function handleQuestionaryTimer(value: number): void {
    Cookies.set("questionaryTimer", value.toString());
  }

  function handleQuestionarySubject(value: string): void {
    Cookies.set("quizSubject", value);
  }

  useEffect(() => {
    const questionarySizeData: string = Cookies.get("questionarySize") || "10";
    const questionaryTimerData: string =
      Cookies.get("questionaryTimer") || "30";
    const quizSubjectData: string = Cookies.get("quizSubject") || "all";
    setQuestionarySize(Number(questionarySizeData));
    setQuestionaryTimer(Number(questionaryTimerData));
    setQuestionarySubject(quizSubjectData);
  }, []);

  return (
    <QuizSettingsContext.Provider
      value={{
        questionarySize,
        questionaryTimer,
        questionarySubject,
        handleQuestionarySize,
        handleQuestionaryTimer,
        handleQuestionarySubject,
        questionarySettings: {
          questionarySizeRange: [minQuestions, maxQuestions],
          questionaryTimerRange: [minTime, maxTime],
        },
      }}
    >
      {children}
    </QuizSettingsContext.Provider>
  );
};

export default QuizSettingsContext;
export const QuizSettingsConsumer = QuizSettingsContext.Consumer;
