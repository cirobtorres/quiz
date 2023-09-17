import Response from "./Response";
import Statement from "./Statement";
import Countdown from "./Countdown";
import styles from "./Question.module.css";
import AnswerModelFrontend from "@models/Response";
import QuestionModelFrontend from "@models/Question";

interface QuestionProps {
  question: QuestionModelFrontend;
  duration: number;
  nextStep: () => void;
  handleResponse: (id: number) => void;
}

const responseOptions = [
  ["A", "#f2c866"],
  ["B", "#f266ba"],
  ["C", "#85d4f2"],
  ["D", "#bce596"],
];

export default function Question({
  question,
  duration,
  nextStep,
  handleResponse,
}: QuestionProps): JSX.Element {
  const answers: AnswerModelFrontend[] = question.arrayAnswers;
  const countdownProps = {
    key: question.id,
    duration: duration || 30,
    nextStep: () => nextStep(),
  };

  function renderAnswers() {
    return answers.map((answer, index) => {
      return (
        <Response
          key={`${question.id}-${answer.id}-${index}`}
          answer={answer}
          letter={responseOptions[index][0]}
          backgroundColorLetter={responseOptions[index][1]}
          handleResponse={handleResponse}
        />
      );
    });
  }

  return (
    <div className={styles.question}>
      <Statement question_text={question.questionText} />
      <Countdown
        key={`${question.id}-${countdownProps.key}`}
        duration={countdownProps.duration}
        nextStep={countdownProps.nextStep}
      />
      {renderAnswers()}
    </div>
  );
}
