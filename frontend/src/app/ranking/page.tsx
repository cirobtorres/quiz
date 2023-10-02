"use client";

import Loading from "@/components/Loading";
import { configs } from "@/configs";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./Ranking.module.css";
import Paginator from "@/components/Paginator";
import UserProfile from "@/components/UserProfile";
import getScoreData from "@/libs/getScoreData";

export default function Ranking(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [ranking, setRanking] = useState<QuizUserPaginated>(
    {} as QuizUserPaginated
  );
  const [order, setOrder] = useState<
    | "username"
    | "reverseUsername"
    | "percentage"
    | "reversePercentage"
    | "totalAnswers"
    | "reverseTotalAnswers"
  >("percentage");

  async function setScoreData(
    currentPage: number | string | null = 1
  ): Promise<void> {
    try {
      setLoading(true);
      const url: string =
        typeof currentPage === "number"
          ? `${configs.urls.RANKING}?page=${currentPage}`
          : typeof currentPage === "string"
          ? currentPage
          : configs.urls.RANKING;
      const data: QuizUserPaginated = await getScoreData(url);
      setRanking(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function orderByTotalCorrectAnswers(): void {
    if (order !== "totalAnswers") {
      const rankingOrderedByTotalCorrectAnswers: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.get_total_correct_answers > b.get_total_correct_answers) {
            return -1;
          }
          if (a.get_total_correct_answers < b.get_total_correct_answers) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByTotalCorrectAnswers);
      setOrder("totalAnswers");
    } else {
      const rankingOrderedByTotalCorrectAnswers: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.get_total_correct_answers < b.get_total_correct_answers) {
            return -1;
          }
          if (a.get_total_correct_answers > b.get_total_correct_answers) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByTotalCorrectAnswers);
      setOrder("reverseTotalAnswers");
    }
  }

  function orderByPercentage(): void {
    if (order !== "percentage") {
      const rankingOrderedByCorrectPercentage: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          }
          if (a.score < b.score) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByCorrectPercentage);
      setOrder("percentage");
    } else {
      const rankingOrderedByCorrectPercentage: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.score < b.score) {
            return -1;
          }
          if (a.score > b.score) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByCorrectPercentage);
      setOrder("reversePercentage");
    }
  }

  function orderByUsername(): void {
    if (order !== "username") {
      const rankingOrderedByUsername: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.username < b.username) {
            return -1;
          }
          if (a.username > b.username) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByUsername);
      setOrder("username");
    } else {
      const rankingOrderedByUsername: QuizUserPaginated = {
        ...ranking,
        results: ranking.results.sort((a, b) => {
          if (a.username > b.username) {
            return -1;
          }
          if (a.username < b.username) {
            return 1;
          }
          return 0;
        }),
      };
      setRanking(rankingOrderedByUsername);
      setOrder("reverseUsername");
    }
  }

  useEffect(() => {
    setScoreData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <UserProfile />
      <h1>Ranking</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Posição no Ranking</th>
            <th onClick={orderByUsername}>Apelido</th>
            <th onClick={orderByPercentage}>Taxa de Acerto</th>
            <th onClick={orderByTotalCorrectAnswers}>Total de Acertos</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {ranking.results.map((score, index) => (
            <tr key={score.id} className={styles.tr}>
              <td className={styles.ranking}>{index + 1}</td>
              <td className={styles.name}>{score.username}</td>
              <td className={styles.score}>{score.score.toFixed(2)}%</td>
              <td className={styles.totalAnswers}>
                {score.get_total_correct_answers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator paginator={ranking.paginator} setScoreData={setScoreData} />
      <Link href="/" className={styles.backToHomeLink}>
        Home
      </Link>
    </div>
  );
}
