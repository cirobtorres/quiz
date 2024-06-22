"use client";

import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import { useState } from "react";

export default function QuizPage() {
  const [loading, setLoading] = useState(false);
  return loading ? <Loading /> : <QuestionCard />;
}
