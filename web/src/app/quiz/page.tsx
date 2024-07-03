"use client";

import { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import getQuestions from "@/libs/getQuestions";
import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import useUser from "@/hooks/useUser";
import Question from "@/models/Question";
import Skip from "@/components/Skip";
import QuestionIndex from "@/components/QuestionIndex";
import postScore from "@/libs/postScore";

type ScoreRequest = {
  quizId: number;
  totalQuestions: number;
  correctAnswers: number;
};

type ScoreResponse = {
  score: {
    scoreIds: number[];
    scorePercentage: number;
    totalQuestions: number;
    correctAnswers: number;
  };
};

export default function QuizPage() {
  const { user, loading: userLoading } = useUser();

  if (!user && !userLoading) {
    redirect("/entrar");
  }

  const [loading, setLoading] = useState(true);
  const questions = useRef<Question[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const router = useRouter();

  const loadingQuestions = async () => {
    try {
      setLoading(true);
      const questionArray = await getQuestions({ params: { quiz: 1 } });
      questions.current = questionArray.map((question: QuestionAPI) => {
        return Question.create(question);
      });
      setQuestion(questions.current[0]);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const navToScore = async (scores: ScoreRequest[]) => {
    const responseScore: ScoreResponse = await postScore(scores);
    console.log(responseScore);
    // router.push("/quiz/score");
  };

  const calculateScore = () => {
    const scores: Score[] = [];

    questions.current.map((question) => {
      const scoreIndex = scores.findIndex(
        (score) => score.quizId === question.getQuizId
      );
      const quizNotSavedYet = scoreIndex === -1;
      if (quizNotSavedYet) {
        scores.push({
          quizId: question.getQuizId,
          totalQuestions: 1,
          correctAnswers: question.getSelected ? 1 : 0,
        });
      } else {
        scores[scoreIndex].totalQuestions += 1;
        scores[scoreIndex].correctAnswers += question.getSelected ? 1 : 0;
      }
    });

    navToScore(scores);
  };

  const nextQuestion = () => {
    const nextIndex =
      questions.current.findIndex(
        (innerQuestion) => innerQuestion.getId === question?.getId
      ) + 1;
    if (questions.current[nextIndex])
      return setQuestion(questions.current[nextIndex]);
    calculateScore();
  };

  useEffect(() => {
    loadingQuestions(); // Load once when mounting the component: save all questions at once
  }, []);

  return loading || userLoading || question === null ? (
    <Loading />
  ) : (
    <main
      key={question.getId}
      className="fixed w-screen h-screen flex flex-col items-center bg-quiz"
    >
      <QuestionCard
        question={question}
        questions={questions.current}
        setQuestion={setQuestion}
        nextQuestion={nextQuestion}
      />
      <div className="w-full flex flex-col items-center mt-2">
        <QuestionIndex current={question.getId} items={questions.current} />
        {question.getAnswered ? <Skip nextQuestion={nextQuestion} /> : null}
      </div>
    </main>
  );
}
