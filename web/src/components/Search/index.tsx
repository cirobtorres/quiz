import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function Search() {
  return (
    <form className="flex-[2_2_0] w-full max-w-[40rem] mx-auto">
      <div
        className={`
          relative h-full w-full rounded-full shadow-md border border-transparent 
          bg-white dark:border-slate-600 dark:bg-slate-700
        `}
      >
        <button>
          <IoClose className="absolute top-1/2 -translate-y-1/2 left-4 size-5 text-slate-400" />
        </button>
        <input
          type="search"
          className="h-full text-xl text-slate-800 dark:text-slate-200 w-full px-12 py-2 border-none outline-none bg-transparent"
        />
        <button>
          <IoIosSearch className="absolute top-1/2 -translate-y-1/2 right-4 size-6 text-slate-400" />
        </button>
      </div>
    </form>
  );
}
