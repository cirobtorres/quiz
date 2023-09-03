"use client";

import AnswerModelFrontend from "@models/Response";
import styles from "./Response.module.css";
import { useEffect, useState } from "react";

interface RespostaProps {
  answer: AnswerModelFrontend;
  letter: string;
  backgroundColorLetter: string;
  handleResponse: (id: number) => void;
}

export default function Response({
  answer,
  letter,
  backgroundColorLetter,
  handleResponse,
}: RespostaProps) {
  const revealedResponse = answer.fliped ? styles.revealedResponse : "";
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const size = width > 768 ? true : false;
  return (
    <div className={styles.response} onClick={() => handleResponse(answer.id)}>
      <div className={`${revealedResponse} ${styles.content}`}>
        <div className={styles.front}>
          <div
            className={styles.letter}
            style={{ backgroundColor: backgroundColorLetter }}
          >
            {letter}
          </div>
          <div className={styles.answerOption}> {answer.answerText}</div>
        </div>
        <div className={styles.back}>
          {answer.isCorrect ? (
            <div className={styles.correct}>
              {size ? (
                <>
                  <div>A resposta certa é ...</div>
                  <div className={styles.text}>{answer.answerText}</div>
                </>
              ) : (
                <div>Resposta Correta!</div>
              )}
            </div>
          ) : (
            <div className={styles.wrong}>
              <div>Resposta errada!</div>
              {size && <div className={styles.text}>{answer.answerText}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
