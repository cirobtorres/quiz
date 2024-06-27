"use client";

import { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { randomizeBackground } from "@/functions";
import getQuestions from "@/libs/getQuestions";
import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import useUser from "@/hooks/useUser";
import Question from "@/models/Question";
import Skip from "@/components/Skip";
import QuestionIndex from "@/components/QuestionIndex";

export default function QuizPage() {
  const { user, loading: userLoading } = useUser();

  if (!user && !userLoading) {
    redirect("/");
  }

  const [loading, setLoading] = useState(false);
  const questions = useRef<Question[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const backgrounds = randomizeBackground();
  const [background, setBackground] = useState(backgrounds[0]);
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

  const navToScore = async () => {
    // const score = [
    //   {},
    //   {},
    //   {},
    // ]
    // const scoreId = await sendScore();
    // router.push(`/quiz/score/${scoreId ?? null}`);
  };

  const nextQuestion = () => {
    const nextIndex =
      questions.current.findIndex(
        (innerQuestion) => innerQuestion.getId === question?.getId
      ) + 1;
    setBackground(backgrounds[nextIndex]);
    if (questions.current[nextIndex])
      return setQuestion(questions.current[nextIndex]);
    navToScore();
  };

  useEffect(() => {
    loadingQuestions(); // Load once when mounting the component: save all questions at once
  }, []);

  return loading || userLoading || question === null ? (
    <Loading />
  ) : (
    <main
      key={question.getId}
      className="fixed w-screen h-screen flex flex-col items-center"
      style={{
        backgroundImage: String(background),
      }}
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
