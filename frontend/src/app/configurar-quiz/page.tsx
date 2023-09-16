"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { configs } from "@/configs";
import styles from "./Settings.module.css";
import QuizInput from "@/components/QuizInput";
import Loading from "@/components/Loading";
import QuizInputSelect from "@/components/QuizInputSelect";
import Button from "@/components/Button";
import useQuizSettings from "@/hooks/useQuizSettings";
import useQuizUser from "@/hooks/useQuizUser";
import { useRouter } from "next/navigation";

export default function QuizSettings(): JSX.Element {
  const {
    settingsId,
    questionNumber,
    timeToAnswer,
    subjects,
    setQuestionNumber,
    setTimeToAnswer,
    setSubjects,
    updatePreferencies,
    savingToContextPreferenciesData,
  } = useQuizSettings();
  const { quizUser } = useQuizUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [minQuestions, maxQuestions]: number[] = [5, 30];
  const [minTime, maxTime]: number[] = [25, 90];
  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const router = useRouter();

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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const userData = new FormData();
    userData.append("id", String(settingsId));
    userData.append("question_number", String(questionNumber));
    userData.append("time_to_answer", String(timeToAnswer));
    userData.append("preferences_quiz", JSON.stringify(subjects));
    if (!subjects) {
      throw new Error("No subjects to update");
    }
    if (!userData) {
      throw new Error("No data to update");
    }
    await updatePreferencies(userData);
    setLoading(false);
    router.refresh();
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
    quizUser && savingToContextPreferenciesData(quizUser.preferences_user);
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
                value={timeToAnswer}
                onChange={(value) => setTimeToAnswer(value)}
                onBlur={handleOnBlur}
              />
            </div>
            <QuizInputSelect
              label="Disciplinas"
              quizes={quizes}
              default={subjects}
              setValues={setSubjects}
            />
            <span>
              *O quiz fará uma seleção de questões apenas das disciplinas que
              estiverem salvas
            </span>
            <Button text="Salvar" onClick={handleSubmit} />
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
