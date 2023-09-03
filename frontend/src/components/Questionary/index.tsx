import Question from "./Question";
import Button from "../Button";
import styles from "./Questionary.module.css";
import QuestionModelFrontend from "@models/Question";
import Index from "./QuestionIndex";
import Link from "next/link";

interface ButtonProps {
  lastQuestion: boolean;
  onClickNavNextQuestion: () => void;
}

interface QuestionaryProps {
  buttonProps: ButtonProps;
  question: QuestionModelFrontend | null;
  questions: number[];
  nextStep: () => void;
  answerResponse: (question: QuestionModelFrontend) => void;
}

export default function Questionary({
  buttonProps,
  question,
  questions,
  nextStep,
  answerResponse,
}: QuestionaryProps) {
  const handleResponse = (id: number): void => {
    if (question?.notAnswered) {
      answerResponse(question.onClickResponse(id));
    }
  };

  return (
    <div className={styles.questionary}>
      {question ? (
        <>
          <Question
            question={question}
            nextStep={nextStep}
            handleResponse={handleResponse}
          />
          <Index question={question} questions={questions} />
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
