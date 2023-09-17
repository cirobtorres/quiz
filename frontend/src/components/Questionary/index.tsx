import Question from "./Question";
import Button from "../Button";
import styles from "./Questionary.module.css";
import QuestionModelFrontend from "@models/Question";
import QuestionIndex from "./QuestionIndex";
import Link from "next/link";

interface ButtonProps {
  lastQuestion: boolean;
  onClickNavNextQuestion: () => void;
}

interface QuestionaryProps {
  buttonProps: ButtonProps;
  question: QuestionModelFrontend | null;
  questions: number[];
  duration: number;
  nextStep: () => void;
  answerResponse: (question: QuestionModelFrontend, quizId: number) => void;
}

export default function Questionary({
  buttonProps,
  question,
  questions,
  duration,
  nextStep,
  answerResponse,
}: QuestionaryProps) {
  const handleResponse = (id: number): void => {
    if (question?.notAnswered) {
      answerResponse(question.onClickResponse(id), question.question_quiz);
    }
  };

  return (
    <div className={styles.questionary}>
      {question ? (
        <>
          <Question
            question={question}
            duration={duration}
            nextStep={nextStep}
            handleResponse={handleResponse}
          />
          <QuestionIndex question={question} questions={questions} />
        </>
      ) : (
        false
      )}
      <Button
        text={buttonProps.lastQuestion ? "Finalizar" : "Próxima"}
        onClick={buttonProps.onClickNavNextQuestion}
      />
      <Link href="/" className={styles.link}>
        Abandonar Quiz
      </Link>
    </div>
  );
}
