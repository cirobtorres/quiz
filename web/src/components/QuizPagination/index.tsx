import { RiArrowDropLeftLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function QuizPagination() {
  return (
    <div className="flex justify-center gap-2">
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 border border-white dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 
        `}
      >
        <MdKeyboardDoubleArrowLeft className="text-slate-800 dark:text-slate-200 text-lg" />
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 border border-white dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 
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
          text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 border border-white dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 
        `}
      >
        7
      </button>
      <button
        className={`
          size-7 miniaturize-user-quiz-pagination flex justify-center items-center text-xs shadow-md rounded 
          text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 border border-white dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 
        `}
      >
        <MdKeyboardDoubleArrowLeft className="text-slate-800 dark:text-slate-200 text-lg rotate-180" />
      </button>
    </div>
  );
}
