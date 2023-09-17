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
  const [quizIds, setQuizIds] = useState<QuizIdsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const buttonProps = {
    lastQuestion: idNextQuestion() === undefined,
    onClickNavNextQuestion: () => nextStep(),
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const questionsData = await getQuestions(
        quizUser?.preferences_user as number
      );
      setQuestions(questionsData.questionsList.map((question) => question.id));
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

  const sendScoreData = async (scoreData: ScoreDataProps) => {
    try {
      setLoading(true);
      const responseScoreData = await sendScore(scoreData);
      router.push(
        `${configs.routers.questionary.SCORE}/` +
          `${quizUser?.username}/` +
          `${responseScoreData.score.scorePercentage}/` +
          `${responseScoreData.score.totalQuestions}/` +
          `${responseScoreData.score.totalCorrectAnswers}`
      );
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

  function answerResponse(
    question: QuestionModelFrontend,
    quizId: number
  ): void {
    setQuestion(question);
    setQuizIds((prevQuestionId) => {
      const newQuestionId = [...prevQuestionId];
      const index = newQuestionId.findIndex((item) => item.quizId === quizId);
      if (index === -1) {
        newQuestionId.push({
          quizId: question.question_quiz,
          totalQuestions: 1,
          totalCorrectAnswers: question.correctAnswer ? 1 : 0,
        });
      } else {
        newQuestionId[index].totalQuestions += 1;
        newQuestionId[index].totalCorrectAnswers += question.correctAnswer
          ? 1
          : 0;
      }
      return newQuestionId;
    });
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
    const scoreData: ScoreDataProps = {
      quizUserId: quizUser?.id as number,
      quizIds,
    };
    sendScoreData({ ...scoreData });
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
          duration={quizUser?.preferences.instance.time_to_answer as number}
          nextStep={nextStep}
          answerResponse={answerResponse}
        />
      )}
    </main>
  );
}
