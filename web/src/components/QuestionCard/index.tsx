import Question from "@/models/Question";
import Countdown from "../Countdown";

const responseOptions = [
  ["A", "#f2c866"],
  ["B", "#f266ba"],
  ["C", "#85d4f2"],
  ["D", "#bce596"],
];

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <>
      <div className="w-full h-[30%] flex flex-col items-center mb-40 bg-gradient-to-r from-slate-100 to-slate-300">
        <div className="relative w-full h-full flex items-center shadow-darker">
          <h1 className="w-1/2 mx-auto text-2xl text-slate-800">
            {question.getText}
          </h1>
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 p-4 shadow-darker bg-slate-500 rounded-full">
            <Countdown duration={30} whenFinish={() => console.log("Finish")} />
          </div>
        </div>
      </div>
      <div className="w-1/2 grid grid-cols-2 gap-3">
        {question.getShuffledAnswers.map((answer: any, index: number) => (
          <Response
            key={`${index}-${answer.id}`}
            option={responseOptions[index][0]}
            text={answer.text}
          />
        ))}
      </div>
    </>
  );
}

export function Response({
  text,
  option,
}: // color,
{
  text: any;
  option: any;
  // color: any;
}) {
  return (
    <div
      className="w-full flex flex-1 flex-col gap-2 mx-auto cursor-pointer perspective-1000 rounded-xl shadow-darker"
      onClick={() => console.log("click")}
    >
      <div className="w-full relative flex flex-col flex-1 transition duration-700 transform-style-3d">
        <div className="flex gap-3 items-center p-3 rounded-xl bg-white">
          <div
            className="font-extrabold after:content-[')']"
            // style={{ color }}
          >
            {option}
          </div>
          <span className="w-full truncate">{text}</span>
        </div>
      </div>
    </div>
  );
}
