import Question from "@/models/Question";
import Countdown from "../Countdown";
import Answer from "@/models/Answer";

const responseOptions = ["A", "B", "C", "D"];

export default function QuestionCard({
  question,
  setQuestion,
}: {
  question: Question;
  setQuestion: (question: Question) => void;
}) {
  function flipCards(question: Question, quizId: number) {
    setQuestion(question);
  }

  const handleFlip = (id: number) => {
    if (question.getNotAnswered) {
      flipCards(question.onClick(id), question.getQuizId);
    }
  };

  return (
    <>
      <header className="w-full h-[30%] flex flex-col items-center mb-40 bg-gradient-to-r from-slate-100 to-slate-300">
        <div className="relative w-full h-full flex items-center shadow-darker">
          <h1 className="w-1/2 mx-auto text-2xl text-slate-800">
            {question.getText}
          </h1>
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 p-4 shadow-darker bg-slate-500 rounded-full">
            <Countdown duration={30} whenFinish={() => console.log("Finish")} />
          </div>
        </div>
      </header>
      <div className="w-1/2 grid grid-cols-2 gap-3">
        {question.getShuffledAnswers.map((answer: any, index: number) => (
          <Response
            key={`${index}-${answer.id}`}
            answer={answer}
            option={responseOptions[index]}
            flip={handleFlip}
          />
        ))}
      </div>
    </>
  );
}

export function Response({
  answer,
  option,
  flip,
}: {
  answer: Answer;
  option: any;
  flip: (id: number) => void;
}) {
  const flipCard = answer.getFlipped ? "flip-card" : null;
  // Once the user chooses a question option, the flip function updates the question state with a new question instance
  // This new question instance is different from the previous question instance on two aspects:
  //    - question instance: it sets the "selected" attribute to true
  //    - answer instances: tt sets the "flipped" attribute to true for both the chosen answer and the correct answer instances
  // This is when "flip-card" style attr kicks on and applies the transform rotateY effect
  return (
    <div className="outer-card-container" onClick={() => flip(answer.getId)}>
      <div className={`${flipCard} inner-card-container`}>
        <div className="front-card bg-white">
          <div className="option">{option}</div>
          <span className="w-full truncate">{answer.getText}</span>
        </div>
        {answer.getIsCorrect ? (
          <div className="back-card text-white bg-green-500">
            <div className="option">{option}</div>
            <span className="w-full truncate">{answer.getText}</span>
          </div>
        ) : (
          <div className="back-card text-white bg-red-500">
            <div className="option">{option}</div>
            <span className="w-full truncate">{answer.getText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
