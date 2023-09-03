"use client";

import { useEffect } from "react";

import styles from "./Paginator.module.css";

interface PaginatorProps {
  paginator: Paginator;
  setScoreData: (currentPage?: number | null) => Promise<void>;
}

export default function Paginator({
  paginator,
  setScoreData,
}: PaginatorProps): JSX.Element | boolean {
  function asPaginasDoMeio(paginator: Paginator): JSX.Element | boolean {
    return (
      <>
        {paginator.current > paginator.first && (
          <button
            onClick={() => setScoreData(paginator.first)}
            className={styles.buttons}
          >
            {paginator.first}
          </button>
        )}
        {paginator.current > 3 && "..."}
        {paginator.current > paginator.first + 1 && (
          <button
            onClick={() => setScoreData(paginator.current - 1)}
            className={styles.buttons}
          >
            {paginator.current - 1}
          </button>
        )}
        <button className={`${styles.buttonCurrent} ${styles.buttons}`}>
          {paginator.current}
        </button>
        {paginator.current < paginator.total_pages - 1 && (
          <button
            className={styles.buttons}
            onClick={() => setScoreData(paginator.current + 1)}
          >
            {paginator.current + 1}
          </button>
        )}
        {paginator.current < paginator.total_pages - 2 && "..."}
        {paginator.current !== paginator.total_pages && (
          <button
            onClick={() => setScoreData(paginator.total_pages)}
            className={styles.buttons}
          >
            {paginator.total_pages}
          </button>
        )}
      </>
    );
  }

  return (
    paginator.total_pages > 1 && (
      <div className={styles.buttonsContainer}>
        {paginator.previous ? (
          <button
            onClick={() => setScoreData(paginator.previous)}
            className={`${styles.buttonPreviousEnabled} ${styles.buttonPreviousStyle}`}
          >
            Voltar
          </button>
        ) : (
          <span
            className={`${styles.buttonPreviousDisabled} ${styles.buttonPreviousStyle}`}
          >
            Voltar
          </span>
        )}
        {asPaginasDoMeio(paginator)}
        {paginator.next ? (
          <button
            onClick={() => setScoreData(paginator.next)}
            className={`${styles.buttonNextEnabled} ${styles.buttonNextStyle}`}
          >
            Avançar
          </button>
        ) : (
          <span
            className={`${styles.buttonNextDisabled} ${styles.buttonNextStyle}`}
          >
            Avançar
          </span>
        )}
      </div>
    )
  );
}
