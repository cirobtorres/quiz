"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { configs } from "@/configs";
import styles from "./Settings.module.css";
import QuizInput from "@/components/QuizInput";
import Loading from "@/components/Loading";

export default function QuizSettings(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [minQuestions, maxQuestions]: number[] = [5, 30];
  const [minTime, maxTime]: number[] = [25, 90];
  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const [subjects, setSubjects] = useState<string[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(10);
  const [timeToResponse, setTimeToResponse] = useState<number>(30);

  // https://react-select.com/home

  const options = quizes.map((quiz) => ({
    value: quiz.id,
    label: quiz.subject,
  }));

  const CustomSelectComponent = () => (
    <Select
      closeMenuOnSelect={true}
      components={makeAnimated()}
      defaultValue={[options[1]]}
      isMulti
      options={options}
    />
  );

  function cannotExceedRange(value: number, min: number, max: number): number {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }

  async function getAllQuizes() {
    const response = await fetch(configs.urls.QUIZ, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return response.json();
  }

  async function loadQuizes() {
    try {
      setLoading(true);
      const quizesData = await getAllQuizes();
      setQuizes(quizesData);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuizes();
  }, []);

  return (
    <main className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Configurar Quiz</h1>
          <div>
            <QuizInput
              name="questionNumber"
              label="Número de Questões"
              type="number"
              max={maxQuestions}
              min={minQuestions}
              value={questionNumber}
              width={styles.inputWidth}
              onChange={(value) =>
                setQuestionNumber(
                  cannotExceedRange(value, minQuestions, maxQuestions)
                )
              }
            />
            <QuizInput
              name="timeToResponse"
              label="Tempo para resposta"
              type="number"
              max={maxTime}
              min={minTime}
              value={timeToResponse}
              width={styles.inputWidth}
              onChange={(value) =>
                setTimeToResponse(cannotExceedRange(value, minTime, maxTime))
              }
            />
          </div>
          <span>Disciplinas:</span>
          {CustomSelectComponent()}
          <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
            Voltar
          </Link>
        </>
      )}
    </main>
  );
}
