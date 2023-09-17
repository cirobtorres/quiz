"use client";

import { createContext, useEffect, useState } from "react";
import getPreferences from "@/libs/getPreferences";
import updatePreferences from "@/libs/updatePreferences";

interface QuizSettingsContextProps {
  loading: boolean;
  preferences: PreferencesModel;
  quizList: { value: number; label: string }[];
  questions: QuestionModel[];
  update: (userData: FormData) => Promise<void>;
  questionNumberChange: (value: number) => void;
  timeToAnswerChange: (value: number) => void;
  savingToContextPreferencesData: (userId: number) => Promise<void>;
}

const QuizSettingsContext = createContext<QuizSettingsContextProps>(
  {} as QuizSettingsContextProps
);

export const QuizSettingsProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<PreferencesModel>(
    {} as PreferencesModel
  );
  const [quizList, setQuizList] = useState<{ value: number; label: string }[]>(
    []
  );
  const [questions, setQuestions] = useState<QuestionModel[]>([]);

  async function savingToContextPreferencesData(userId: number): Promise<void> {
    setLoading(true);
    const preferences = await getPreferences(userId);
    const instance: PreferencesModel = preferences.instance;
    const questionsList: QuestionModel[] = preferences.questionsList;
    const quizList: QuizModel[] = preferences.quizList;
    setPreferences(instance);
    setQuestions(questionsList);
    setQuizList(
      quizList.map((quiz) => ({
        value: quiz.id,
        label: quiz.subject,
      }))
    );
    setLoading(false);
  }

  async function update(userData: FormData): Promise<void> {
    try {
      setLoading(true);
      const userId: number = await updatePreferences(userData);
      await savingToContextPreferencesData(userId);
    } catch (error: any) {
      throw new Error(`Error at QuizSettingsProvider during update: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  function questionNumberChange(value: number) {
    if (value > 0) {
      setPreferences({ ...preferences, question_number: value });
    }
  }

  function timeToAnswerChange(value: number) {
    if (value > 0) {
      setPreferences({ ...preferences, time_to_answer: value });
    }
  }

  return (
    <QuizSettingsContext.Provider
      value={{
        loading,
        preferences,
        quizList,
        questions,
        update,
        questionNumberChange,
        timeToAnswerChange,
        savingToContextPreferencesData,
      }}
    >
      {children}
    </QuizSettingsContext.Provider>
  );
};

export default QuizSettingsContext;
export const QuizSettingsConsumer = QuizSettingsContext.Consumer;
