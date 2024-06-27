import Question from "@/models/Question";

export default function QuestionIndex({
  current,
  items,
}: {
  current: number;
  items: Question[];
}) {
  return (
    <ul className="w-1/2 flex justify-center gap-2 mt-2 mb-4">
      {items.map((question, index) => (
        <li
          key={`${index + 1}-${question.getId}`}
          className={`text-slate-900 outline outline-2 outline-transparent outline-offset-2 shadow-darker
          size-7 flex justify-center items-center rounded-md cursor-pointer ${
            question.getAnswered
              ? question.getSelected
                ? "bg-green-500 text-green-900"
                : "bg-red-500 text-red-900"
              : "bg-white"
          }
          `}
          style={{
            color: current === items[index].getId ? "#0f172a" : "",
            outlineColor: current === items[index].getId ? "cyan" : "",
            backgroundColor: current === items[index].getId ? "white" : "",
          }}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
}
