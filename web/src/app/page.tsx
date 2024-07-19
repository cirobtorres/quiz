import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import QuizCard from "@/components/QuizCard";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Presentation from "@/components/Presentation";
import Quiz from "@/models/Quiz";
import { getQuiz } from "@/libs/quizzes";
import Search from "@/components/Search";

export default async function HomePage() {
  return (
    <>
      <HomePageHeader />
      <main className="w-full flex flex-col justify-center mb-auto">
        <Presentation />
        <QuickQuizCards />
        <ForumSection />
        <SearchSection />
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

const QuickQuizCards = () => {
  return (
    <section className="w-full py-20">
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
              Configure e salve um quiz com suas preferências e escolha o número
              e os temas das questões, o limite de tempo e mais!
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ForumSection = () => {
  return (
    <section className="w-full py-20 mb-20 bg-slate-300">
      <article>
        <div className="w-full max-w-xl mx-auto mb-10">
          <h2 className="inline-grid">
            <span
              className="[grid-column-start:1] [grid-row-start:1] before:content-[attr(data-text)] text-5xl text-center font-extrabold blur-xl bg-gradient-to-r from-pink-500 via-cyan-500 to-lime-500 bg-clip-text text-transparent pointer-events-none"
              data-text="Central de discussões da Comunidade"
            />
            <span className="[grid-column-start:1] [grid-row-start:1] text-5xl text-center font-extrabold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Central de discussões da Comunidade
            </span>
          </h2>
        </div>
        <div className="max-w-webpage mx-auto">
          <p className="text-center text-xl">
            Participe das discussões de nossa comunidade e compartilhe ideias e
            quizzes com outros usuários.
          </p>
        </div>
      </article>
      <Forum />
    </section>
  );
};

const Forum = () => {
  return (
    <article className="max-w-webpage mx-auto py-10 my-10 rounded-2xl bg-slate-500">
      <div className="">
        <h2></h2>
      </div>
    </article>
  );
};

const SearchSection = () => {
  return (
    <>
      <section className="w-full py-10">
        <article className="max-w-webpage mx-auto">
          <div className="mb-10">
            <div className="mb-4">
              <h2 className="text-5xl text-center font-extrabold text-slate-800">
                Quizzes da comunidade!
              </h2>
            </div>
            <p className="text-center text-xl">
              Pesquise e jogue quizzes de outros usuários da comunidade. Filtre
              por títulos, tags, criadores e mais!
            </p>
          </div>
          <div className="mb-10">
            <Search />
          </div>
        </article>
      </section>
      <Suspense
        fallback={
          <div className="max-w-webpage mx-auto flex justify-center items-center">
            <Loading />
          </div>
        }
      >
        <QuizCardGrid />
      </Suspense>
    </>
  );
};

const QuizCardGrid = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 6000));
  const quizArray: QuizAPI = await getQuiz();
  return (
    <section className="mx-auto my-2">
      <article className="mx-auto max-w-webpage grid grid-cols-4 gap-4">
        {quizArray.results.map((quiz) => {
          const quizModel = Quiz.create(quiz);
          return (
            <QuizCard
              key={quizModel.getId}
              image={{
                src: quizModel.getCover.getSecureUrl,
                alt: quizModel.getSlug,
              }}
              title={quizModel.getSubject}
              description={quizModel.getDescription}
            />
          );
        })}
      </article>
    </section>
  );
};
