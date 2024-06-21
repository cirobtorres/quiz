"use client";

import Avatar from "@/components/Avatar";
import Modal from "@/components/Modal";
import QuizCard from "@/components/QuizCard";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import useModal from "../hooks/useModal";

export default function HomePage() {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, setIsOpen } = useModal();
  const modalProps = {
    title: "Hello World",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, est. Commodi eum aliquid odio, fugit laudantium vel aspernatur quia laboriosam.",
    isOpen,
    setIsOpen,
  };
  return (
    <>
      <Modal {...modalProps} />
      <main className="w-3/4 mx-auto flex flex-col justify-center">
        <UserFeatures />
        <div className="relative flex-1 px-4">
          <h1
            onClick={() => setIsOpen(true)}
            className="text-white text-7xl text-center font-extrabold"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </h1>
        </div>
        <div className="flex justify-between h-full flex-wrap px-4 gap-4">
          <QuizCard
            src="/images/quiz/geography-scaled-2048x1366.jpeg"
            alt="Globo da Terra"
            theme="#3f6212"
            title="Geografia do Brasil"
            description="Descrição de Quiz Name 1"
          />
          <QuizCard
            src="/images/quiz/history-scaled-1600x800.jpg"
            alt="Mapa de navegação antigo e bússola"
            theme="#92400e"
            title="História do Brasil"
            description="Descrição de Quiz Name 2"
          />
          <QuizCard
            src="/images/quiz/ciencia-1183x887.png"
            alt="Âtomo conceitual"
            theme="#155e75"
            title="Ciência e Tecnologia"
            description="Descrição de Quiz Name 3"
          />
        </div>
      </main>
    </>
  );
}

const user = {
  src: "/images/user/avatar/user-avatar.jpg",
  userId: 1,
  username: "johndoe",
};

const UserFeatures = () => {
  const { setTheme } = useTheme();
  return (
    <div className="fixed left-16 top-8 gap-8 z-50 flex items-center">
      <Avatar user={user} />
      <button
        type="button"
        onClick={() => setTheme()}
        className="relative bg-slate-200 w-8 h-4 rounded-lg"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-[2px] w-[14px] h-[14px] bg-slate-600 rounded-full" />
      </button>
    </div>
  );
};
