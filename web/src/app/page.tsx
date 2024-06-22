"use client";

import Avatar from "@/components/Avatar";
import Modal from "@/components/Modal";
import QuizCard from "@/components/QuizCard";
import useTheme from "../hooks/useTheme";
import useModal from "../hooks/useModal";

export default function HomePage() {
  const { isOpen, setIsOpen } = useModal();
  const modalProps = {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis modi incidunt accusantium officiis deserunt. Ad explicabo id recusandae voluptatem? Itaque voluptates veritatis distinctio id eligendi aperiam minus. Aliquam, nesciunt dolore.",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, est. Commodi eum aliquid odio, fugit laudantium vel aspernatur quia laboriosam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, est. Commodi eum aliquid odio, fugit laudantium vel aspernatur quia laboriosam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, est.",
    isOpen,
    setIsOpen,
  };
  return (
    <>
      <Modal {...modalProps} />
      <header className="w-full relative py-4 mb-12">
        <UserFeatures />
        <h1
          onClick={() => setIsOpen(true)}
          className="text-white text-7xl text-center font-extrabold"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </h1>
      </header>
      <main className="w-full flex flex-col justify-center mb-auto">
        <div className="my-2">
          <h2 className="text-white text-4xl font-extrabold py-2 mb-4">
            QUIZ rápido
          </h2>
          <div className="flex justify-center gap-4">
            <QuizCard
              title="Iniciar!"
              link="quiz"
              description="Questões aleatórias de todas as disciplicas"
              options={{
                theme: "#a21caf",
                titleAlign: "text-center",
                textAlign: "text-center",
              }}
            />
            <QuizCard
              title="Configurar QUIZ"
              link="quiz"
              description="Configure disciplinas, tempo de resposta e mais..."
              options={{
                theme: "#a21caf",
                titleAlign: "text-center",
                textAlign: "text-center",
              }}
            />
          </div>
        </div>
        <div className="my-2">
          <h2 className="text-white text-4xl font-extrabold py-2 mb-4">
            QUIZ por categoria
          </h2>
          <div className="grid grid-cols-3 h-56 gap-4">
            <QuizCard
              image={{
                src: "/images/quiz/geography-scaled-2048x1366.jpeg",
                alt: "Globo da Terra",
              }}
              title="Geografia do Brasil"
              description="Descrição de Quiz Name 1"
              link="quiz"
              options={{
                theme: "#14532d",
              }}
            />
            <QuizCard
              image={{
                src: "/images/quiz/history-scaled-1600x800.jpg",
                alt: "Mapa de navegação antigo e bússola",
              }}
              title="História do Brasil"
              description="Descrição de Quiz Name 2"
              link="quiz"
              options={{
                theme: "#d97706",
              }}
            />
            <QuizCard
              image={{
                src: "/images/quiz/ciencia-1183x887.png",
                alt: "Âtomo conceitual",
              }}
              title="Ciência e Tecnologia"
              description="Descrição de Quiz Name 3"
              link="quiz"
              options={{
                theme: "#4f46e5",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}

const user = {
  src: "/images/user/avatar/user-avatar.jpg",
  userId: 1,
  username: "johndoe",
  email: "johndoe@gmail.com",
};

const UserFeatures = () => {
  const { setTheme } = useTheme();
  return (
    <div className="absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 gap-8 z-[999]">
      {/* <button
        type="button"
        onClick={() => setTheme()}
        className="relative bg-slate-200 w-8 h-4 rounded-lg"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-[2px] w-[14px] h-[14px] bg-slate-600 rounded-full" />
      </button> */}
      <Avatar user={user} />
    </div>
  );
};
