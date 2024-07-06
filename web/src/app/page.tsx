import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import QuizCard from "@/components/QuizCard";
import Link from "next/link";
import getQuiz from "@/libs/getQuiz";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Presentation from "@/components/Presentation";

export default async function HomePage() {
  return (
    <>
      <HomePageHeader />
      <main className="w-full flex flex-col justify-center mb-auto">
        <Presentation />
        <QuizBalloons />
        <Suspense
          fallback={
            <div className="max-w-webpage mx-auto flex justify-center items-center">
              <Loading />
            </div>
          }
        >
          <QuizCardGrid />
        </Suspense>
      </main>
    </>
  );
}

const HomePageHeader = () => {
  return (
    <header className="w-full max-w-webpage relative py-4 mb-20">
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

const User = () => {
  return (
    <div className="absolute flex items-center justify-center right-40 top-1/2 -translate-y-1/2 gap-8 z-[999]">
      <Avatar />
    </div>
  );
};

const QuizBalloons = () => {
  return (
    <section className="w-full py-20 mb-12 bg-slate-300">
      <div className="max-w-webpage mx-auto">
        <div className="mb-10">
          <h2 className="text-5xl text-center font-extrabold text-slate-800">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sit
            earum rerum impedit tenetur? Ullam sunt dolorem amet porro.
          </h2>
        </div>
        <div className="flex justify-between gap-4">
          <Link
            href="/quiz"
            className="flex-1 p-8 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-slate-400"
          >
            <h3 className="text-2xl text-center font-extrabold text-slate-800">
              Quiz rápido
            </h3>
            <span>
              Jogue um quiz com questões aleatórias de diversos temas com limite
              de tempo de resposta de 30 segundos para cada questão.
            </span>
          </Link>
          <Link
            href="/"
            className="flex-1 p-8 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-slate-400"
          >
            <h3 className="text-2xl text-center font-extrabold text-slate-800">
              Quiz sem limite de tempo
            </h3>
            <span>
              Jogue um quiz com questões aleatórias de diversos temas sem limite
              de tempo de resposta!
            </span>
          </Link>
          <Link
            href="/"
            className="flex-1 p-8 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-slate-400"
          >
            <h3 className="text-2xl text-center font-extrabold text-slate-800">
              Configurar quiz
            </h3>
            <span>
              Configure e salve um quiz com suas preferências e escolha os temas
              de questão, o limite de tempo de resposta, o número de questões e
              mais!
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

const QuizCardGrid = async () => {
  await new Promise((resolve) => setTimeout(resolve, 6000));
  const quizArray: QuizAPI = await getQuiz();
  return (
    <section className="max-w-webpage mx-auto my-2">
      <div className="grid grid-cols-4 gap-4">
        {quizArray.results.map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              image={{
                src: quiz.get_image_url,
                alt: quiz.slug,
              }}
              title={quiz.subject}
              description={quiz.description}
              theme={quiz.theme}
            />
          );
        })}
      </div>
    </section>
  );
};
