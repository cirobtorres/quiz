"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import QuizInput from "@/components/QuizInput";
import QuizInputSelect from "@/components/QuizInputSelect";
import Button from "@/components/Button";
import styles from "./CreateQuiz.module.css";
import { configs } from "@/configs";
import useQuizUser from "@/hooks/useQuizUser";
import getQuizes from "@/libs/getQuizes";
import getAllQuestions from "@/libs/getAllQuestions";

interface Dictionary {
  value: number;
  label: string;
}

interface FormDataProps {
  quizId: string;
  quizSubject: string;
  questionId: string;
  questionText: string;
  answers: {
    answerId: string;
    answerText: string;
    isCorrect: boolean;
  }[];
}

export default function CreateQuiz(): JSX.Element {
  const { quizUser } = useQuizUser();
  const [loading, setLoading] = useState<boolean>(true);

  const [maxQuestTxtChars, maxAnsTxtChars] = [135, 65];

  const [quizes, setQuizes] = useState<QuizModel[]>([]);
  const [quiz, setQuiz] = useState<Dictionary[]>([]);

  const [questionList, setQuestionList] = useState<
    Dictionary[] | ResponseProps
  >([]);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<
    {
      id: number;
      answer_text: string;
      is_correct: boolean;
    }[]
  >([]);

  const [allquestionData, setAllquestionData] = useState<QuestionModel>(
    {} as QuestionModel
  );

  const [correctAnswerText, setCorrectAnswerText] = useState<string>("");
  const [answerText1, setAnswerText1] = useState<string>("");
  const [answerText2, setAnswerText2] = useState<string>("");
  const [answerText3, setAnswerText3] = useState<string>("");

  async function sendQuizQuestionAnswers(
    formData: FormDataProps
  ): Promise<void> {
    try {
      setLoading(true);
      const response = await fetch(configs.urls.user.SAVE_CUSTOM_QUIZ, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = {} as FormDataProps;
    formData.quizId = quiz[0].value.toString();
    formData.quizSubject = quiz[0].label.toString();
    formData.questionId = allquestionData.id.toString();
    formData.questionText = allquestionData.question_text.toString();
    formData.answers = [
      {
        answerId: answers[0].id.toString(),
        answerText: correctAnswerText.toString(),
        isCorrect: true,
      },
      {
        answerId: answers[1].id.toString(),
        answerText: answerText1.toString(),
        isCorrect: false,
      },
      {
        answerId: answers[2].id.toString(),
        answerText: answerText2.toString(),
        isCorrect: false,
      },
      {
        answerId: answers[3].id.toString(),
        answerText: answerText3.toString(),
        isCorrect: false,
      },
    ];
    await sendQuizQuestionAnswers(formData);
  }

  function fillQuestionAndAnswersList(values: any): void {
    setAllquestionData({
      id: values[0].value,
      question_text: values[0].label,
      question_quiz: values[0].question_quiz,
      get_shuffled_answers: values[0].answers,
    });
    setQuestion(values.map((value: Dictionary) => value.value));
    const shuffledAnswers = values[0].answers;
    shuffledAnswers.sort((a: any, b: any) => a.id - b.id);
    shuffledAnswers.sort((a: any, b: any) => {
      if (a.is_correct) {
        return -1;
      }
      if (b.is_correct) {
        return 1;
      }
      return 0;
    });
    setCorrectAnswerText(shuffledAnswers[0].answer_text);
    setAnswerText1(shuffledAnswers[1].answer_text);
    setAnswerText2(shuffledAnswers[2].answer_text);
    setAnswerText3(shuffledAnswers[3].answer_text);
    setAnswers(shuffledAnswers);
  }

  async function loadQuizes(): Promise<void> {
    try {
      setLoading(true);
      const quizesData = await getQuizes();
      setQuizes(quizesData);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function fillQuestionSelect(): Promise<void> {
    try {
      setLoading(true);
      const questionsData = await getAllQuestions(
        quiz.map((value: Dictionary) => value.value) as unknown as number
      );
      setQuestionList(questionsData);
    } catch (error: any) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuizes();
  }, []);

  useEffect(() => {
    fillQuestionSelect();
  }, [quiz]);

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
            default={[]}
            closeOnSelect
            setValues={setQuiz}
          />
          {quiz.length > 0 && (
            <QuizInputSelect
              label="Enunciado"
              creatable
              quizes={questionList}
              questions
              default={[]}
              closeOnSelect
              setValues={fillQuestionAndAnswersList}
            />
          )}
          {question && (
            <>
              <QuizInput
                type="text"
                name="Alternativa Correta"
                value={correctAnswerText}
                label="Alternativa Correta"
                placeholder="Ex.: Brasília"
                required
                onChange={setCorrectAnswerText}
              />
              <label>Alternativas Incorretas</label>
              <QuizInput
                type="text"
                value={answerText1}
                placeholder="Ex.: São Paulo"
                required
                onChange={setAnswerText1}
              />
              <QuizInput
                type="text"
                value={answerText2}
                placeholder="Ex.: Rio de Janeiro"
                required
                onChange={setAnswerText2}
              />
              <QuizInput
                type="text"
                value={answerText3}
                placeholder="Ex.: Belo Horizonte"
                required
                onChange={setAnswerText3}
              />
            </>
          )}
        </div>
        <hr />
        <span className={styles.note}>
          OBS: máximo de {maxQuestTxtChars} caracteres para o enunciado e{" "}
          {maxAnsTxtChars} caracteres para as respostas
        </span>
        <div className={styles.buttons}>
          <Button text="Salvar" onClick={handleSubmit} />
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
