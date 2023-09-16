"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import QuizInput from "@/components/QuizInput";
import QuizInputSelect from "@/components/QuizInputSelect";
import Button from "@/components/Button";
import styles from "./CreateQuiz.module.css";
import { configs } from "@/configs";
// import cannotExceedRange from "@/functions/cannotExceedRange";

export default function CreateQuiz(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const [questionText, setQuestionText] = useState<string>("");
  const [correctAnswerText, setCorrectAnswerText] = useState<string>("");
  const [answerText1, setAnswerText1] = useState<string>("");
  const [answerText2, setAnswerText2] = useState<string>("");
  const [answerText3, setAnswerText3] = useState<string>("");
  const [maxQuestTxtChars, maxAnsTxtChars] = [135, 65];

  async function getAllQuizes() {
    const response = await fetch(configs.urls.QUIZ, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return response.json();
  }

  async function loadQuizes() {
    try {
      setLoading(true);
      const quizesData = await getAllQuizes();
      setQuizes(quizesData);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuizes();
  }, []);

  return (
    <main className={styles.container}>
      <form>
        <h1>Criar Quiz</h1>
        <p>
          Selecione uma disciplina já existente caso você queira adicionar
          questões novas ou crie uma disciplina completamente do zero escrevendo
          o nome da disciplina no campo suspenso abaixo.
        </p>
        <div className={styles.quizFieldsContainer}>
          <QuizInputSelect
            label="Disciplina"
            creatable
            quizes={quizes}
            default={[1]} // TODO: I'M INCOMPLETE
            setValues={(values) => console.log(values)} // TODO: I'M INCOMPLETE
          />
          <QuizInput
            type="text"
            name="Enunciado"
            value={questionText}
            placeholder="Ex.: Qual a capital do Brasil?"
            label="Enunciado"
            required
            onChange={(value) => setQuestionText(value)}
          />
          <QuizInput
            type="text"
            name="Alternativa Correta"
            value={correctAnswerText}
            label="Alternativa Correta"
            placeholder="Ex.: Brasília"
            required
            onChange={(value) => setCorrectAnswerText(value)}
          />
          <label>Alternativas Incorretas</label>
          <QuizInput
            type="text"
            value={answerText1}
            placeholder="Ex.: São Paulo"
            required
            onChange={(value) => setAnswerText1(value)}
          />
          <QuizInput
            type="text"
            value={answerText2}
            placeholder="Ex.: Rio de Janeiro"
            required
            onChange={(value) => setAnswerText2(value)}
          />
          <QuizInput
            type="text"
            value={answerText3}
            placeholder="Ex.: Belo Horizonte"
            required
            onChange={(value) => setAnswerText3(value)}
          />
        </div>
        <hr />
        <span className={styles.note}>
          OBS: máximo de {maxQuestTxtChars} caracteres para o enunciado e{" "}
          {maxAnsTxtChars} caracteres para as respostas
        </span>
        <div className={styles.buttons}>
          <Button text="Salvar" onClick={() => console.log("Salvar")} />
          <Button
            text="Limpar"
            onClick={() => console.log("Limpar")}
            backgroundColor={styles.backgroundColor}
          />
        </div>
      </form>
      <div className={styles.links}>
        <Link href={configs.routers.configQuiz.ROOT}>Voltar</Link>
        <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
          Home
        </Link>
      </div>
    </main>
  );
}
