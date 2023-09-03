"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";

import Statistics from "@/components/Statistics";
import Button from "@/components/Button";
import { configs } from "@/configs";
import getScore from "@/libs/getScore";
import styles from "./Score.module.css";
import Loading from "@/components/Loading";
import Link from "next/link";

interface Params {
  params: { id: number };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  if (!params.id)
    return {
      title: "Not Found",
    };
  return {
    title: `Pontuação | ${params.id}`,
    description: `Pontuação do usuário no quiz ${params.id}`,
  };
}

export default function Score({ params }: Params): JSX.Element {
  const [finalScore, setFinalScore] = useState<ScoreModel | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchScore() {
      try {
        const scoreData = await getScore(configs.urls.SCORE, params.id);
        setFinalScore(scoreData);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
    fetchScore();
  }, [params.id]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const size = width > 500 ? true : false;

  return (
    <div className={styles.score}>
      <div className={styles.scoreHeader}>
        <h1>Resultado</h1>
      </div>
      <div className={styles.statistics}>
        <Statistics
          value={finalScore?.total_questions ?? ""}
          text="Perguntas"
        />
        <Statistics
          value={finalScore?.total_correct_answers ?? ""}
          text="Certas"
          dynamicBackgroundColor="#9cd2a4"
        />
        <Statistics
          value={finalScore?.get_score_percentage ?? ""}
          text="Percentual"
          dynamicBackgroundColor="#de6a33"
        />
      </div>
      {finalScore && size && (
        <div className={styles.paragraph}>
          <p>
            Você acertou {finalScore.total_correct_answers} de{" "}
            {finalScore.total_questions} questões!
          </p>
          <p>Sua pontuação foi de {finalScore.get_score_percentage}!</p>
        </div>
      )}
      <Button href={configs.routers.questionary.ROOT} text="Tentar novamente" />
      <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
        Home
      </Link>
    </div>
  );
}
