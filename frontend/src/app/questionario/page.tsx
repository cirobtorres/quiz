"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

import { configs } from "@/configs";
import getQuestions from "@/libs/getQuestions";
import getQuestion from "@/libs/getQuestion";
import sendScore from "@/libs/sendScore";
import Questionary from "@/components/Questionary";
import Loading from "@/components/Loading";
import QuestionModelFrontend from "@models/Question";

import styles from "./Questions.module.css";
import useQuizUser from "@/hooks/useQuizUser";

interface Params {
  username: string;
  quiz: string;
}

interface ScoreData {
  quizId: number;
  quizUser: number;
  correctAnswers: number;
  totalQuestions: number;
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  return {
    title: "Pontuação",
    description: "Pontuação do usuário no quiz",
  };
  // if (!params.username)
  //   return {
  //     title: "Not Found",
  //   };
  // return {
  //   title: `Pontuação | ${params.quiz}`,
  //   description: `Pontuação do usuário ${params.username} no quiz ${params.quiz}`,
  // };
}

export default function Questions(): JSX.Element {
  const { quizUser } = useQuizUser();
  const [question, setQuestion] = useState<QuestionModelFrontend | null>(null);
  const [questions, setQuestions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const buttonProps = {
    lastQuestion: idNextQuestion() === undefined,
    onClickNavNextQuestion: () => nextStep(),
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const questionsData = await getQuestions(configs.urls.QUESTIONS);
      setQuestions(questionsData.map((question) => question.id));
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestion = async (id: number) => {
    try {
      setLoading(true);
      const questionData = await getQuestion(configs.urls.QUESTIONS, id);
      const questionAsFrontendObject =
        QuestionModelFrontend.createAsAnObject(questionData);
      setQuestion(questionAsFrontendObject);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const sendScoreData = async (
    url: string,
    id: number,
    score_user: number,
    correctAnswers: number,
    totalQuestions: number
  ) => {
    try {
      setLoading(true);
      const scoreData = await sendScore(
        url,
        id,
        score_user,
        correctAnswers,
        totalQuestions
      );
      router.push(`${configs.routers.questionary.SCORE}/${scoreData.id}`);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    questions.length > 0 && loadQuestion(questions[0]);
  }, [questions]);

  function answerResponse(question: QuestionModelFrontend): void {
    setQuestion(question);
    setScore((prevScore) =>
      question.correctAnswer ? prevScore + 1 : prevScore
    );
  }

  function idNextQuestion(): number | undefined {
    if (question) {
      const nextIndex: number = questions.indexOf(question.id) + 1;
      return questions[nextIndex];
    }
  }

  function navToNextQuestion(nextIndex: number): void {
    loadQuestion(nextIndex);
  }

  function navToScore() {
    const scoreData: ScoreData = {
      quizId: 1, // TODO: quizId comes from url
      quizUser: quizUser?.id as number,
      correctAnswers: score,
      totalQuestions: questions.length,
    };

    sendScoreData(
      configs.urls.SCORE,
      scoreData.quizId,
      scoreData.quizUser,
      scoreData.correctAnswers,
      scoreData.totalQuestions
    );
  }

  function nextStep(): void {
    const nextIndex = idNextQuestion();
    nextIndex ? navToNextQuestion(nextIndex) : navToScore();
  }

  return (
    <main className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <Questionary
          question={question}
          questions={questions}
          buttonProps={buttonProps}
          nextStep={nextStep}
          answerResponse={answerResponse}
        />
      )}
    </main>
  );
}
