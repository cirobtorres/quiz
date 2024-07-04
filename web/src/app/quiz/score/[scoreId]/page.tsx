"use client";

import Loading from "@/components/Loading";
import getScore from "@/libs/getScore";
import { useParams } from "next/navigation";
import { Suspense } from "react";

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

interface Params {
  scoreId: number;
}

export default function ScorePage({ scoreId }: Params) {
  const getParams = useParams();

  return (
    <main className="fixed w-full h-full flex justify-center pb-40 items-center bg-quiz">
      <Suspense fallback={<Loading />}>
        <Scores scoreId={Number(getParams.scoreId)} />
      </Suspense>
    </main>
  );
}

const Scores = async ({ scoreId }: Params) => {
  const scores: TotalScoreProps = await getScore(scoreId);
  const text = scoreText(scores.get_score);
  return (
    <div className="flex flex-col gap-4 items-center">
      <div key={scores.id} className="grid grid-cols-3 gap-4">
        <ScoreCircle
          text="Questões"
          value={scores.get_total}
          options={{ textColor: "#172554", circleColor: "#3b82f6" }}
        />
        <ScoreCircle
          text="Corretas"
          value={scores.get_corrects}
          options={{ textColor: "#3b0764", circleColor: "#a855f7" }}
        />
        <ScoreCircle
          text="Score Total"
          value={`${scores.get_score.toFixed(1)}%`}
          options={{ textColor: "#500724", circleColor: "#ec4899" }}
        />
      </div>
      {text ? (
        <span className="text-3xl text-slate-100 font-extrabold">{text}</span>
      ) : null}
    </div>
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
        className="flex flex-col justify-center items-center size-80 rounded-full bg-blue-500"
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
