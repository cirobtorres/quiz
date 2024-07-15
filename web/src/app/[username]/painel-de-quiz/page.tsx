"use client";

import Link from "next/link";
import Image from "next/image";
import { HiPencil } from "react-icons/hi2";
import { motion } from "framer-motion";
import QuizInput, {
  AnswerInput,
  QuestionInput,
} from "@/components/Inputs/QuizInputs";
import Breadcrums from "../../../components/Breadcrumbs";
import useUser from "@/hooks/useUser";
import Loading from "@/components/Loading";
import QuizPagination from "../../../components/QuizPagination";

export default function QuizPanelPage() {
  const { user } = useUser();

  return (
    <div className="w-full flex flex-col h-full min-h-svh px-1 pb-1 bg-slate-300 overflow-hidden">
      <Breadcrums />
      <div className="flex-col flex gap-1">
        <section className="w-full flex-1 bg-slate-100 border border-white p-8 shadow-md rounded-md">
          <article className="flex flex-col gap-2">
            <div className="mb-4">
              <h1 className="uppercase font-extrabold text-3xl text-slate-800">
                Seus Quizzes
              </h1>
            </div>
            <div className="w-full grid grid-cols-3 gap-2 justify-center pb-4 quiz-pannel-grid-2 quiz-pannel-grid-1">
              <PopularQuiz />
              <PopularQuiz />
              <PopularQuiz />
            </div>
            <QuizPagination />
          </article>
        </section>
        <section className="w-full flex-1 bg-slate-100 border border-white p-8 shadow-md rounded-md">
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
        </section>
      </div>
    </div>
  );
}

const PopularQuiz = ({ src }: { src?: string }) => {
  return (
    <Link
      href=""
      className={`
          relative flex w-full overflow-hidden 
          rounded-xl shadow-md bg-white translate-y-0 [transition:all_0.6s_cubic-bezier(0.165,0.84,0.44,1)] 
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
          <span className="font-extrabold text-slate-800">QuizName</span>
          <div className="flex justify-center items-center h-5 px-1 rounded-full bg-green-100 border border-green-500">
            <span className="text-[10px] leading-3 text-green-500">
              Público
            </span>
          </div>
        </div>
        <div className="h-18">
          <span className="text-slate-800 text-sm line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            aliquid est praesentium, laboriosam nemo pariatur, delectus,
            architecto eum blanditiis vitae cumque tempora atque deleniti saepe
            esse labore? Dicta, nulla? Officia.
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.75rem] text-slate-400">
            Atualizado ontem, 02-07-2024
          </span>
          <span className="text-[0.75rem] text-slate-400">
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
