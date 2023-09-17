"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { useParams } from "next/navigation";

import Statistics from "@/components/Statistics";
import Button from "@/components/Button";
import { configs } from "@/configs";
import getScore from "@/libs/getScore";
import styles from "./Score.module.css";
import Loading from "@/components/Loading";
import Link from "next/link";

interface Params {
  useSearchParams: {
    username: string;
    scorePercentage: string;
    totalQuestions: string;
    totalCorrectAnswers: string;
  };
}

export async function generateMetadata({
  useSearchParams,
}: Params): Promise<Metadata> {
  if (!useSearchParams.username)
    return {
      title: "Not Found",
    };
  return {
    title: `Pontuação | ${useSearchParams.username}`,
    description: `Pontuação do usuário no quiz ${useSearchParams.username}`,
  };
}

export default function Score(): JSX.Element {
  const params = useParams();
  const [width, setWidth] = useState(window.innerWidth);

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
        <Statistics value={Number(params.totalQuestions)} text="Perguntas" />
        <Statistics
          value={Number(params.totalCorrectAnswers)}
          text="Certas"
          dynamicBackgroundColor="#9cd2a4"
        />
        <Statistics
          value={Number(params.scorePercentage)}
          text="Percentual"
          dynamicBackgroundColor="#de6a33"
        />
      </div>
      {size && (
        <div className={styles.paragraph}>
          <p>
            Você acertou {params.totalCorrectAnswers} de {params.totalQuestions}{" "}
            questões!
          </p>
          <p>Sua pontuação foi de {params.scorePercentage}!</p>
        </div>
      )}
      <Button href={configs.routers.questionary.ROOT} text="Tentar novamente" />
      <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
        Home
      </Link>
    </div>
  );
}
