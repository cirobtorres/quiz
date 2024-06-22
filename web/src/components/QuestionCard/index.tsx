import Countdown from "../Countdown";
import Skip from "../Skip";
import Response from "./Response";

const temporaryPages = [
  { questionId: 1, current: false, correct: true },
  { questionId: 2, current: false, correct: true },
  { questionId: 3, current: false, correct: true },
  { questionId: 4, current: false, correct: false },
  { questionId: 5, current: false, correct: false },
  { questionId: 6, current: false, correct: true },
  { questionId: 7, current: false, correct: true },
  { questionId: 8, current: false, correct: true },
  { questionId: 9, current: false, correct: false },
  { questionId: 10, current: false, correct: true },
  { questionId: 11, current: true, correct: null },
  { questionId: 12, current: false, correct: null },
  { questionId: 13, current: false, correct: null },
  { questionId: 14, current: false, correct: null },
  { questionId: 15, current: false, correct: null },
  { questionId: 16, current: false, correct: null },
  { questionId: 17, current: false, correct: null },
  { questionId: 18, current: false, correct: null },
  // { questionId: 19, current: false, correct: null },
  // { questionId: 20, current: false, correct: null },
];

const temporaryAnswers = [
  { id: 1, text: "Lorem ipsum dolor sit." },
  { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing." },
  { id: 3, text: "Lorem ipsum dolor." },
  { id: 4, text: "Lorem ipsum dolor sit amet consectetur." },
];

const responseOptions = [
  ["A", "#f2c866"],
  ["B", "#f266ba"],
  ["C", "#85d4f2"],
  ["D", "#bce596"],
];

export default function QuestionCard() {
  return (
    <main className="flex flex-col gap-3 items-center">
      <Statement />
      <Countdown duration={30} whenFinish={() => console.log("Finish")} />
      {temporaryAnswers.map((answer: any, index: number) => (
        <Response
          key={`${index}-${answer.id}`}
          option={responseOptions[index][0]}
          color={responseOptions[index][1]}
          text={answer.text}
        />
      ))}
      <Pagination />
      <Skip />
    </main>
  );
}

const Statement = () => {
  return (
    <div className="w-3/4 p-1 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-2xl shadow-darker">
      <h1 className="w-full p-3 text-2xl rounded-xl bg-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        laudantium iste labore aperiam, reprehenderit debitis laborum amet quasi
        quidem eos non possimus placeat accusamus tempora eligendi obcaecati?
        Cumque, ut quaerat.
      </h1>
    </div>
  );
};

const Pagination = () => {
  return (
    <ul className="w-96 flex flex-wrap gap-2 my-2">
      {temporaryPages.map((page, index) => (
        <li
          key={`${index + 1}-${page.questionId}`}
          className={`${
            page.current
              ? "current-page"
              : page.correct === true
              ? "correct-page"
              : page.correct === false
              ? "wrong-page"
              : null
          } outline outline-2 outline-transparent outline-offset-2 shadow-darker
          size-7 flex justify-center items-center rounded-md cursor-pointer bg-white
          `}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};
