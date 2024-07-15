import { randomizer } from "@/functions";

const placeholder = (() => {
  const array = [
    "Política Brasileira",
    "Geopolítica",
    "2ª Guerra Mundial",
    "Antigo Testamento",
  ];
  const index = randomizer(array.length);
  return array[index];
})();

export default function QuizInput({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <div className={`flex w-full flex-col`}>
      <div className={"relative"}>
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          autoComplete="new-password"
          className={`
            w-full rounded-xl p-4 text-slate-800 outline-none shadow-md
            focus:ring-0 placeholder:text-transparent peer 
            focus:placeholder:text-slate-400 active:placeholder:text-slate-400 
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-emerald-600 text-lg duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slate-800 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] 
            peer-focus:-translate-y-[1.1rem] peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export const QuestionInput = ({
  id,
  label,
  placeholder = "",
}: {
  id: string;
  label: string;
  placeholder?: string;
}) => {
  return (
    <div className={`flex w-full flex-col`}>
      <div className={"relative"}>
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          autoComplete="new-password"
          className={`
            w-full rounded-xl p-4 text-slate-800 outline-none shadow-md
            focus:ring-0 placeholder:text-transparent peer 
            focus:placeholder:text-slate-400 active:placeholder:text-slate-400 
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-emerald-600 text-lg duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slate-800 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] 
            peer-focus:-translate-y-[1.1rem] peer-focus:text-emerald-600 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export const AnswerInput = ({
  id,
  label,
  placeholder = "",
  correct = false,
}: {
  id: string;
  label: string;
  placeholder?: string;
  correct?: boolean;
}) => {
  return (
    <div className={`flex w-full flex-col`}>
      <div className={"relative"}>
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          autoComplete="new-password"
          style={{ borderColor: correct ? "#3b82f6" : "" }}
          className={`
            w-full rounded-xl p-4 text-slate-800 outline-none shadow-md
            focus:ring-0 placeholder:text-transparent peer border-2 border-transparent
            focus:placeholder:text-slate-400 active:placeholder:text-slate-400 
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-lg duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] 
            peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
            ${
              correct
                ? "text-blue-500 peer-focus:text-blue-500 peer-placeholder-shown:text-blue-500"
                : "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500"
            }
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};
