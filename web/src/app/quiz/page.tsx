"use client";

import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import useUser from "@/hooks/useUser";
import Question from "@/models/Question";
import Skip from "@/components/Skip";
import Pagination from "@/components/Pagination";
import { randomizeBackground } from "@/functions";
import getQuestions from "@/libs/getQuestions";
import { redirect } from "next/navigation";

export default function QuizPage() {
  const { user, loading: userLoading } = useUser();

  if (!user && !userLoading) {
    redirect("/");
  }

  const [question, setQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [backgrounds, setBackgrounds] = useState(randomizeBackground());

  const loadingQuestions = async () => {
    try {
      setLoading(true);
      const questionArray = await getQuestions();
      setQuestions(
        questionArray.map((question: QuestionAPI) => {
          return Question.create(question);
        })
      );
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    console.log("nextQuestion");
  };

  useEffect(() => {
    questions.length > 0 && setQuestion(questions[0]);
  }, [questions]);

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
        backgroundImage: String(backgrounds[0]),
      }}
    >
      <QuestionCard question={question} setQuestion={setQuestion} />
      <div className="w-full flex flex-col items-center mt-2">
        <Pagination questions={questions} />
        {question.getAnswered ? <Skip nextQuestion={nextQuestion} /> : null}
      </div>
    </main>
  );
}
