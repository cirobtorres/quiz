"use client";

import Link from "next/link";
import TotalScore from "../../../models/Score";
import ProgressCircle from "../../ProgressCircle";
import { useEffect, useState } from "react";
import { getScore } from "../../../libs/scores";
import Loading from "../../Loading";

export const LastScoreCard = ({ scoreId }: { scoreId: number }) => {
  const [score, setScore] = useState(null);

  const returnAsyncCards = async (scoreId: number) => {
    const scoreObj = await getScore(scoreId);
    setScore(scoreObj);
  };

  useEffect(() => {
    returnAsyncCards(scoreId);
  }, []);
  return (
    <article className="flex flex-col p-8 gap-2 w-full max-w-56 h-fit rounded-xl shadow-md border border-white dark:border-slate-600 bg-slate-100 dark:bg-slate-700">
      {score && (
        <>
          <div>
            <h3 className="text-slate-800 dark:text-slate-200 text-xl font-extrabold">
              Último Quiz
            </h3>
            <span className="text-slate-400 text-[0.6rem] leading-[0.8rem]">
              ontem, 05 de julho de 2024
            </span>
          </div>
          <div className="mx-auto">
            <ProgressCircle diameter={120} strokeWidth={10} percentage={60} />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-500 dark:text-slate-200 text-xs">
              Resolvido 10 questões
            </span>
            <span className="text-slate-500 dark:text-slate-200 text-xs">
              Total de 6 acertos
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <ScoreTag subject="História do Brasil" />
            <ScoreTag subject="Ciência" />
            <ScoreTag subject="Português" />
            <ScoreTag subject="Matemática Financeira" />
            <ScoreTag subject="Geopolítica" />
          </div>
        </>
      )}
      {!score && <Loading />}
    </article>
  );
};

export const TotalScoreCard = ({ score }: { score: TotalScore }) => {
  return (
    <article className="w-full max-w-[55%] flex flex-col">
      <div className="w-full mb-4">
        <h3 className="text-slate-800 dark:text-slate-200 font-sans text-3xl font-extrabold uppercase">
          Pontuações
        </h3>
      </div>
      <div>
        <h3 className="text-slate-800 dark:text-slate-200 text-xl font-extrabold">
          Pontuação Total
        </h3>
      </div>
      <div className="flex break-inner-score-column gap-2">
        <ProgressCircle
          diameter={200}
          strokeWidth={15}
          percentage={score.getScorePercentage}
          style={{ fontSize: 40 }}
        />
        <div className="w-full flex flex-col gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Número de questões resolvidas: {score.getTotalQuestions}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Número de quiz completados: XXX
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Maior pontuação num quiz: XXX
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Menor pontuação num quiz: XXX
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Maior tempo gasto num quiz: XXX segundos/questão
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Menor tempo gasto num quiz: XXX segundos/questão
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Disciplina com maior chance de acerto:
            <br />
            <span className="font-extrabold">Geografia do Brasil</span>, índice:{" "}
            {39}/{45} de acertos ({94}%)
          </p>
        </div>
      </div>
      <div className="max-h-40 flex flex-wrap gap-1 mt-2">
        <ScoreTag subject="Geografia do Brasil" />
        <ScoreTag subject="História do Brasil" />
        <ScoreTag subject="Ciência" />
        <ScoreTag subject="Biologia Evolutiva" />
        <ScoreTag subject="Português" />
        <ScoreTag subject="Inglês" />
        <ScoreTag subject="Matemática Financeira" />
        <ScoreTag subject="Geografia do Brasil" />
        <ScoreTag subject="História do Brasil" />
        <ScoreTag subject="Ciência" />
        <ScoreTag subject="Biologia Evolutiva" />
        <ScoreTag subject="Português" />
        <ScoreTag subject="Inglês" />
        <ScoreTag subject="Matemática Financeira" />
        <ScoreTag subject="Geografia do Brasil" />
        <ScoreTag subject="História do Brasil" />
        <Link
          href="#"
          className="h-fit flex justify-center items-center rounded-xl shadow-md bg-blue-500"
        >
          <span className="text-xs py-0.5 px-2 text-white text-nowrap">
            ...
          </span>
        </Link>
      </div>
    </article>
  );
};

export const ScoreTag = ({ subject }: { subject: string }) => {
  return (
    <Link
      href="#"
      className="flex justify-center items-center text-white rounded-full shadow-md overflow-hidden bg-blue-500"
    >
      <span className="text-xs py-0.5 px-2 text-nowrap">{subject}</span>
    </Link>
  );
};
