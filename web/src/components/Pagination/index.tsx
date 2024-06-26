import Question from "@/models/Question";

export default function Pagination({ questions }: { questions: Question[] }) {
  return (
    <ul className="w-1/2 flex justify-center gap-2 mt-2 mb-4">
      {questions.map((question, index) => (
        <li
          key={`${index + 1}-${question.getId}`}
          className={`outline outline-2 outline-transparent outline-offset-2 shadow-darker
          size-7 flex justify-center items-center rounded-md cursor-pointer bg-white
          `}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
}
