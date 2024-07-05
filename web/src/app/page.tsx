import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import { InlineQuiz } from "@/components/QuizCard";
import Link from "next/link";
import QuizCardGrid from "../components/QuizGrid";

export default function HomePage() {
  return (
    <>
      <HomePageHeader />
      <main className="w-full flex flex-col justify-center mb-auto">
        <Presentation />
        {/* <QuizBalloons /> */}
        <QuizCardGrid />
      </main>
    </>
  );
}

const HomePageHeader = () => {
  return (
    <header className="w-full relative py-4 mb-20">
      <div className="relative">
        <h1 className="bg-gradient-to-r from-slate-950 to-slate-600 bg-clip-text">
          <span className="text-transparent text-7xl font-extrabold font-sans">
            2024 <span className="text-pink-500">/</span>
            <span className="text-cyan-500">/</span>
            <span className="text-lime-500">/</span> PROJETO QUIZ
          </span>
        </h1>
        <User />
      </div>
      <p className="text-gray-800 text-xl flex items-center gap-3">
        <FaStar className="text-amber-400" />
        Jogue um quiz e teste seus conhecimentos nas diversas áreas do saber!
      </p>
      <div className="flex flex-col gap-[1px] ml-8">
        <div className="w-[59.5%] h-0.5 bg-pink-800" />
        <div className="w-[59.5%] h-0.5 bg-purple-600" />
        <div className="w-[59.5%] h-0.5 bg-emerald-600" />
      </div>
    </header>
  );
};

const Presentation = () => {
  return (
    <article className="w-1/2 flex flex-col gap-4 mb-10">
      <div>
        <h2 className="text-4xl font-extrabold text-slate-800">
          Cadastre-se para criar quizes totalmente personalizados e
          compartilhá-los com outras pessoas!
        </h2>
      </div>
      <div>
        <p className="text-xl text-slate-800">
          O quiz é composto por questões que têm quatro alternativas de resposta
          cada, e que devem ser respondidas dentro de um limite pré-determinado
          de tempo.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/entrar"
          className="flex-1 text-xl text-center text-slate-800 p-4 rounded-full bg-slate-200 transition-all hover:bg-slate-300"
        >
          Entrar
        </Link>
        <Link
          href="/criar-conta"
          className="flex-1 text-xl text-center text-slate-100 p-4 rounded-full bg-slate-800"
        >
          Criar Conta
        </Link>
      </div>
    </article>
  );
};

const QuizBalloons = () => {
  return (
    <div className="flex justify-between gap-4 mb-12 mx-20">
      <InlineQuiz
        title="Quiz Rápido!"
        options={{
          theme: "#93c5fd",
          border: "6px solid #3b82f6",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Sem limite de tempo!"
        options={{
          theme: "#fda4af",
          border: "6px solid #f43f5e",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Quiz Rápido!"
        options={{
          theme: "#bef264",
          border: "6px solid #84cc16",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Configurar"
        options={{
          theme: "#fde047",
          border: "6px solid #eab308",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
    </div>
  );
};

const User = () => {
  return (
    <div className="absolute flex items-center justify-center right-40 top-1/2 -translate-y-1/2 gap-8 z-[999]">
      <Avatar />
    </div>
  );
};
