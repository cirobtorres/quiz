import { RiArrowDropLeftLine } from "react-icons/ri";

export default function QuizPagination() {
  return (
    <div className="flex justify-center gap-2">
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        <RiArrowDropLeftLine className="text-2xl" />
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        1
      </button>
      <div className="size-7" />
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        5
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-white font-extrabold border border-transparent bg-blue-600  
        `}
      >
        6
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        7
      </button>
      <div className="size-7" />
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        18
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 bg-white border border-white hover:bg-slate-200
        `}
      >
        <RiArrowDropLeftLine className="text-2xl rotate-180" />
      </button>
    </div>
  );
}
