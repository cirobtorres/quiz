"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import useUser from "@/hooks/useUser";
import Question from "@/models/Question";
import Skip from "@/components/Skip";
import Pagination from "@/components/Pagination";
import { randomizeBackground } from "@/functions";

async function getQuestions() {
  const response = await fetch("http://127.0.0.1:8000/api/quiz/question", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed during getQuestions: ${response.statusText} ${response.status}`
    );
  }
  return response.json();
}

export default function QuizPage() {
  const { user } = useUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const backgrounds = randomizeBackground();

  const savingQuestions = async () => {
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

  useEffect(() => {
    savingQuestions(); // Load once when mounting the component
  }, []);

  return loading || questions.length === 0 ? (
    <Loading />
  ) : (
    <main
      key={questions[0].getId}
      className="fixed w-screen h-screen flex flex-col items-center"
      style={{
        backgroundImage: String(backgrounds[0]),
      }}
    >
      <QuestionCard question={questions[0]} />
      <div className="w-full flex flex-col items-center mt-2">
        <Pagination questions={questions} />
        <Skip />
      </div>
    </main>
  );
}
