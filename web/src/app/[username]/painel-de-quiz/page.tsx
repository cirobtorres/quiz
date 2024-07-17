"use client";

import Link from "next/link";
import Image from "next/image";
import { HiPencil } from "react-icons/hi2";
import { IoGridSharp } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";
import QuizInput, {
  AnswerInput,
  QuestionInput,
} from "@/components/Inputs/QuizInputs";
import Breadcrums from "../../../components/Breadcrumbs";
import useUser from "@/hooks/useUser";
import Loading from "@/components/Loading";
import QuizPagination from "../../../components/QuizPagination";
import { useEffect, useRef, useState } from "react";

export default function QuizPanelPage() {
  const { user } = useUser();

  return (
    <div className="w-full flex flex-col min-h-svh px-1 pb-1 bg-slate-300 dark:bg-slate-700 overflow-hidden">
      <Breadcrums />
      <div className="flex-1 flex-col flex gap-1">
        <section className="flex flex-1 bg-slate-100 dark:bg-inherit border border-white dark:border-transparent p-8 rounded-md">
          <article className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3">
                <Select />
                <Select />
              </div>
              <span className="text-slate-500">134 Quizzes</span>
              <div className="flex items-center gap-8">
                <IoIosList className="cursor-pointer text-3xl text-slate-200" />
                <IoGridSharp className="cursor-pointer text-3xl text-slate-200" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="uppercase font-extrabold text-3xl text-slate-800 dark:text-slate-200">
                Seus Quizzes
              </h1>
            </div>
            <div className="w-full grid grid-cols-3 gap-2 pb-4 quiz-pannel-grid-2 quiz-pannel-grid-1">
              <PopularQuiz
                subject="QuizName"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                  aliquid est praesentium, laboriosam nemo pariatur, delectus,
                  architecto eum blanditiis vitae cumque tempora atque deleniti saepe
                  esse labore? Dicta, nulla? Officia."
              />
              <PopularQuiz
                subject="QuizName"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                  aliquid est praesentium, laboriosam nemo pariatur, delectus,
                  architecto eum blanditiis vitae cumque tempora atque deleniti saepe
                  esse labore? Dicta, nulla? Officia."
              />
              <PopularQuiz subject="QuizName" isPublic={false} />
              <PopularQuiz subject="QuizName" isPublic={false} />
            </div>
            <div className="mt-auto mb-0">
              <QuizPagination />
            </div>
          </article>
        </section>
        {/* <section className="w-full flex-1 bg-slate-100 border border-white p-8 shadow-md rounded-md">
          <article className="w-1/2 flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <div className="mb-2">
                <div className="mb-2">
                  <h2 className="flex items-center gap-2 font-extrabold text-3xl text-slate-800">
                    Matemática Financeira
                    <Pencil />
                  </h2>
                </div>
              </div>
              <div className="relative mb-4 h-60 w-full rounded-xl shadow-xl overflow-hidden">
                <Image
                  src="/images/quiz/cover/1024x1024-quiz-cover.jpg"
                  alt=""
                  fill
                  className="absolute object-cover"
                />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <p className="font-extrabold text-xl text-slate-800">
                    Enunciado da Questão
                  </p>
                </div>
                <QuestionInput id="question" label="Enunciado da questão" />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <p className="font-extrabold text-xl text-slate-800">
                    Alternativas de resposta
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <AnswerInput id="answer-1" label="Resposta correta" correct />
                  <AnswerInput id="answer-2" label="Alternativa errada 1" />
                  <AnswerInput id="answer-3" label="Alternativa errada 2" />
                  <AnswerInput id="answer-4" label="Alternativa errada 3" />
                </div>
              </div>
            </div>
            <button className="font-bold px-8 py-2 rounded-md shadow-xl outline-blue-800 text-white bg-blue-500">
              Salvar
            </button>
          </article>
        </section> */}
      </div>
    </div>
  );
}

const Select = () => {
  const [option, setOption] = useState<20 | 40 | 60 | 80 | 100>(20);
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return; // Add a event listener only when the SignedInAvatarBox/SignedOutAvatarBox is opened
    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick); // Clean up
  }, [isOpen]);

  return (
    <div className="flex gap-4 items-center">
      <span className="text-slate-800 dark:text-slate-200">Ordenar:</span>
      <button
        ref={dropdown}
        className="relative rounded-xl min-h-10 w-full max-w-72 min-w-48 bg-white dark:bg-slate-800 border border-transparent dark:border-slate-600 outline-none"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          borderBottomLeftRadius: isOpen ? "0px" : "12px",
          borderBottomRightRadius: isOpen ? "0px" : "12px",
        }}
      >
        <span className="relative w-full h-full pl-8 pr-12 text-slate-800 dark:text-slate-200">
          {option} por página
          <RiArrowDropLeftLine className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-3xl text-slate-800 dark:text-slate-200 pointer-events-none" />
        </span>
        {isOpen && (
          <div className="absolute -left-[1px] -right-[1px] top-full border border-t-0 border-transparent dark:border-slate-600 flex flex-col rounded-b-xl bg-white dark:bg-slate-800 z-50 overflow-hidden">
            <option
              className="px-8 text-slate-800 dark:text-slate-200 py-2 hover:bg-slate-500"
              onClick={() => setOption(20)}
            >
              20 por página
            </option>
            <option
              className="px-8 text-slate-800 dark:text-slate-200 py-2 hover:bg-slate-500"
              onClick={() => setOption(40)}
            >
              40 por página
            </option>
            <option
              className="px-8 text-slate-800 dark:text-slate-200 py-2 hover:bg-slate-500"
              onClick={() => setOption(60)}
            >
              60 por página
            </option>
            <option
              className="px-8 text-slate-800 dark:text-slate-200 py-2 hover:bg-slate-500"
              onClick={() => setOption(80)}
            >
              80 por página
            </option>
            <option
              className="px-8 text-slate-800 dark:text-slate-200 py-2 hover:bg-slate-500"
              onClick={() => setOption(100)}
            >
              100 por página
            </option>
          </div>
        )}
      </button>
    </div>
  );
};

const PopularQuiz = ({
  subject,
  description,
  src,
  isPublic = true,
}: {
  subject: string;
  description?: string;
  src?: string;
  isPublic?: boolean;
}) => {
  return (
    <Link
      href=""
      className={`
          relative flex w-full min-h-32 overflow-hidden border border-transparent dark:border-slate-600
          rounded-xl shadow-md bg-white dark:bg-slate-800 translate-y-0 [transition:all_0.6s_cubic-bezier(0.165,0.84,0.44,1)] 
          after:absolute after:content-[""] after:opacity-0 after:rounded-3xl after:top-0 after:left-0 after:w-full after:h-full
          after:[box-shadow:0_5px_15px_rgba(0,0,0,0.3)] after:[transition:all_0.6s_cubic-bezier(0.165,0.84,0.44,1)]
          hover:scale-[1.02] hover:after:opacity-1
        `}
    >
      <div className="relative w-full max-w-[30%]">
        <Image
          src={src ?? "/images/quiz/cover/1024x1024-quiz-cover.jpg"}
          alt=""
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-1 p-2">
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-slate-800 dark:text-slate-200">
            {subject}
          </span>
          {isPublic ? (
            <div className="flex justify-center items-center size-3 mr-1 rounded-full bg-green-600" />
          ) : (
            <div className="flex justify-center items-center size-3 mr-1 rounded-full bg-red-600" />
          )}
        </div>
        {description && (
          <div className="h-18">
            <span className="text-slate-800 dark:text-slate-400 text-sm line-clamp-2">
              {description}
            </span>
          </div>
        )}
        <div className="flex flex-col mt-auto mb-0">
          <span className="text-[0.75rem] text-slate-300">
            Atualizado ontem, 02-07-2024
          </span>
          <span className="text-[0.75rem] text-slate-300">
            Criado em 14-03-2024
          </span>
        </div>
      </div>
    </Link>
  );
};

const Pencil = () => {
  return (
    <div className="p-1 cursor-pointer rounded-full shadow-xl border border-slate-800 hover:border-blue-500 bg-white hover:bg-slate-100 group">
      <HiPencil className="size-6 group-hover:text-blue-500" />
    </div>
  );
};
