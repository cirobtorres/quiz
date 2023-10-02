"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { configs } from "@/configs";
import styles from "./Settings.module.css";
import QuizInput from "@/components/QuizInput";
import Loading from "@/components/Loading";
import QuizInputSelect from "@/components/QuizInputSelect";
import Button from "@/components/Button";
import useQuizUser from "@/hooks/useQuizUser";
import { useRouter } from "next/navigation";
import getQuizes from "@/libs/getQuizes";

interface Dictionary {
  value: number;
  label: string;
}

export default function QuizSettings(): JSX.Element {
  const { loading, quizUser, updatePreferences } = useQuizUser();
  const [componentLoading, setComponentLoading] = useState<boolean>(true);
  const [minQuestions, maxQuestions]: number[] = [5, 30];
  const [minTime, maxTime]: number[] = [25, 90];
  const [questionNumber, setQuestionNumber] = useState<number>(
    quizUser?.preferences.instance.question_number || 10
  );
  const [timeToAnswer, setTimeToAnswer] = useState<number>(
    quizUser?.preferences.instance.time_to_answer || 30
  );
  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const [subjects, setSubjects] = useState<Dictionary[]>([]);
  const router = useRouter();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    setComponentLoading(true);
    event.preventDefault();
    const userData = new FormData();
    userData.append("id", String(quizUser?.preferences.instance.id));
    userData.append("question_number", String(questionNumber));
    userData.append("time_to_answer", String(timeToAnswer));
    subjects.length !== 0 &&
      userData.append("preferences_quiz", JSON.stringify(subjects));
    if (!userData) {
      throw new Error("No data to update");
    }
    await updatePreferences(userData);
    router.push(configs.routers.HOME);
    setComponentLoading(false);
  }

  function OnBlur(
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

  async function loadQuizes() {
    try {
      setComponentLoading(true);
      const quizesData = await getQuizes();
      setQuizes(quizesData);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setComponentLoading(false);
    }
  }

  useEffect(() => {
    loadQuizes();
  }, []);

  return (
    <div className={styles.container}>
      {loading || componentLoading ? (
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
                onBlur={OnBlur}
              />
              <QuizInput
                name="timeToResponse"
                label="Tempo para resposta"
                type="number"
                max={maxTime}
                min={minTime}
                value={timeToAnswer}
                onChange={(value) => setTimeToAnswer(value)}
                onBlur={OnBlur}
              />
            </div>
            <QuizInputSelect
              label="Disciplinas"
              quizes={quizes}
              default={
                quizUser?.preferences.quizList.map((quiz) => ({
                  value: quiz.id,
                  label: quiz.subject,
                })) || []
              }
              isMulti
              setValues={setSubjects}
            />
          </form>
          <span className={styles.infoText}>
            *O quiz fará uma seleção de questões apenas das disciplinas que
            estiverem salvas
          </span>
          <Button text="Salvar" onClick={handleSubmit} />
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
    </div>
  );
}
