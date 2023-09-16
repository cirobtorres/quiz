"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { configs } from "@/configs";

interface QuizSettingsContextProps {
  settingsId: number | null;
  questionNumber: number;
  timeToAnswer: number;
  subjects: number[];
  setQuestionNumber: (value: number) => void;
  setTimeToAnswer: (value: number) => void;
  setSubjects: (value: number[]) => void;
  updatePreferencies: (userData: FormData) => Promise<void>;
  savingToContextPreferenciesData: (userId: number) => Promise<void>;
}

const QuizSettingsContext = createContext<QuizSettingsContextProps>(
  {} as QuizSettingsContextProps
);

export const QuizSettingsProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [settingsId, setSettingsId] = useState<number | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(10);
  const [timeToAnswer, setTimeToAnswer] = useState<number>(30);
  const [subjects, setSubjects] = useState<number[]>([]);

  async function savingToContextPreferenciesData(
    userId: number
  ): Promise<void> {
    const preferences = await getPreferencies(userId);
    const instance = preferences.instance;
    const questions = preferences.questions;
    // settingsId is not the same as quizUser.id!!
    // settingsId is the id of the preferences instance
    // which makes one-to-one relation with quizUser
    setSettingsId(instance.id);
    setQuestionNumber(instance.question_number);
    setTimeToAnswer(instance.time_to_answer);
    setSubjects(instance.preferences_quiz);
    setLoading(false);
  }

  async function getPreferencies(userId: number) {
    const response = await fetch(`${configs.urls.user.PREFERENCES}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return await response.json();
  }

  async function updatePreferencies(userData: FormData) {
    const response = await fetch(
      `${configs.urls.user.PREFERENCES_UPDATE}/${userData.get("id")}`,
      {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return await response.json();
  }

  return (
    <QuizSettingsContext.Provider
      value={{
        settingsId,
        questionNumber,
        timeToAnswer,
        subjects,
        setQuestionNumber,
        setTimeToAnswer,
        setSubjects,
        updatePreferencies,
        savingToContextPreferenciesData,
      }}
    >
      {children}
    </QuizSettingsContext.Provider>
  );
};

export default QuizSettingsContext;
export const QuizSettingsConsumer = QuizSettingsContext.Consumer;
