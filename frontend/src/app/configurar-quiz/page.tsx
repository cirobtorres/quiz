"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { configs } from "@/configs";
import styles from "./Settings.module.css";
import QuizInput from "@/components/QuizInput";
import Loading from "@/components/Loading";
import QuizInputSelect from "@/components/QuizInputSelect";
import Button from "@/components/Button";
// import cannotExceedRange from "@/functions/cannotExceedRange";

export default function QuizSettings(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [minQuestions, maxQuestions]: number[] = [5, 30];
  const [minTime, maxTime]: number[] = [25, 90];
  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const [subjects, setSubjects] = useState<string[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(10);
  const [timeToResponse, setTimeToResponse] = useState<number>(30);

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

  function handleOnBlur(
    value: number,
    func: Function,
    min: number,
    max: number
  ): void {
    if (value < min) {
      func(min);
    }
    if (value > max) {
      func(max);
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
          <form className={styles.formContainer}>
            <div className={styles.quizInputs}>
              <QuizInput
                name="questionNumber"
                label="Número de Questões"
                type="number"
                max={maxQuestions}
                min={minQuestions}
                value={questionNumber}
                onChange={(value) => setQuestionNumber(value)}
                onBlur={handleOnBlur}
              />
              <QuizInput
                name="timeToResponse"
                label="Tempo para resposta"
                type="number"
                max={maxTime}
                min={minTime}
                value={timeToResponse}
                onChange={(value) => {
                  setTimeToResponse(value);
                }}
                onBlur={handleOnBlur}
              />
            </div>
            <QuizInputSelect label="Disciplinas" quizes={quizes} />
            <span>
              *O quiz fará uma seleção de questões apenas das disciplinas que
              estiverem salvas
            </span>
            <Button
              text="Salvar"
              onClick={() => console.log("Salvar Settings")}
            />
          </form>
          <div className={styles.links}>
            <Link
              href={configs.routers.configQuiz.CREATE_QUIZ}
              className={styles.saveNewQuestions}
            >
              Cadastrar Perguntas
            </Link>
            <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
              Voltar
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
