"use client";

import Loading from "@/components/Loading";
import { redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import TotalScore from "@/models/Score";
import Link from "next/link";
import { getScore } from "@/libs/scores";

export default function ScorePage() {
  const { user, loading } = useUser();

  if (!user && !loading) {
    redirect("/");
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-quiz">
      {user && (
        <Suspense fallback={<Loading />}>
          <Scores scoreId={user.getLastScoreId} />
        </Suspense>
      )}
      <div className="flex flex-col mb-8">
        <p className="text-2xl text-white">Deixe um feedback para o criador</p>
        <div className="flex justify-center gap-1">
          <FaStar className="text-transparent stroke-[14] stroke-white text-5xl cursor-pointer" />
          <FaStar className="text-transparent stroke-[14] stroke-white text-5xl cursor-pointer" />
          <FaStar className="text-transparent stroke-[14] stroke-white text-5xl cursor-pointer" />
          <FaStar className="text-transparent stroke-[14] stroke-white text-5xl cursor-pointer" />
          <FaStar className="text-transparent stroke-[14] stroke-white text-5xl cursor-pointer" />
        </div>
        <p className="text-2xl text-white">(Opcional)</p>
        <textarea />
      </div>
      <Link
        href="/"
        className="text-white text-3xl w-1/4 text-center px-8 py-4 rounded-2xl bg-blue-600"
      >
        Voltar
      </Link>
    </main>
  );
}

const scoreText = (scoreTotal: number) => {
  switch (true) {
    case scoreTotal == 100.0:
      return "Mais impressionante ainda é como esse cérebro cabe nessa cabeça! 🧠🧠";
    case scoreTotal >= 80.0:
      return "Brabo demais. Continue se mantendo informando assim!";
    case scoreTotal >= 60.0:
      return "Esse resultado é satisfatório, parabéns!";
    case scoreTotal >= 50.0:
      return "Resultado ok, mas você pode melhorar 👍👍";
    case scoreTotal >= 30.0:
      return "Resultado bem ruizinho, hein!";
    case scoreTotal >= 0.0:
      return `Não é à toa que vem escrivo "contém ovos" na caixa de ovos... 🤮🤮`;
    default:
      return null;
  }
};

const Scores = ({ scoreId }: { scoreId: number }) => {
  const [score, setScore] = useState<TotalScore | null>(null);

  const getScoreData = async () => {
    // const scoreData = await getScore(scoreId);
    const scoreData = await getScore(1);
    const score = TotalScore.create(scoreData);
    setScore(score);
  };

  useEffect(() => {
    getScoreData();
  }, []);

  return (
    score && (
      <div className="flex flex-col gap-4 items-center">
        <div key={score.getId} className="grid grid-cols-3 gap-4">
          <ScoreCircle
            text="Questões"
            value={score.getTotalQuestions}
            options={{ textColor: "#172554", circleColor: "#3b82f6" }}
          />
          <ScoreCircle
            text="Corretas"
            value={score.getCorrectAnswers}
            options={{ textColor: "#3b0764", circleColor: "#a855f7" }}
          />
          <ScoreCircle
            text="Score Total"
            value={`${score.getScorePercentage.toFixed(1)}%`}
            options={{ textColor: "#500724", circleColor: "#ec4899" }}
          />
        </div>
        <div className="mb-8">
          <span className="text-3xl text-slate-100 font-extrabold">
            {scoreText(score.getScorePercentage)}
          </span>
        </div>
      </div>
    )
  );
};

const ScoreCircle = ({
  text,
  value,
  options,
}: {
  text: string;
  value: number | string;
  options?: { textColor: string; circleColor: string };
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-slate-100 text-5xl font-extrabold">{text}</h2>
      <div
        className="flex flex-col justify-center items-center size-72 rounded-full bg-blue-500"
        style={{ backgroundColor: options?.circleColor }}
      >
        <span
          className="text-blue-950 text-7xl font-extrabold"
          style={{ color: options?.textColor }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};
