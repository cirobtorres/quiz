"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import { motion } from "framer-motion";
import Input from "../components/Input";
import QuizCard, { InlineQuiz } from "@/components/QuizCard";
import PasswordInput, { PasswordRules } from "../components/PasswordInput";
import useUser from "@/hooks/useUser";

export default function HomePage() {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="relative w-screen opacity-10">
        <svg viewBox="0 0 500 500" className="absolute top-0 left-0">
          <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"></path>
        </svg>
      </div>
      <header className="w-full relative py-4 mb-12">
        <div className="relative">
          <h1 className="text-gray-800 text-7xl font-extrabold">
            2024 <span className="text-pink-500">/</span>
            <span className="text-cyan-500">/</span>
            <span className="text-lime-500">/</span> PROJETO QUIZ
          </h1>
          <User />
        </div>
        <p className="text-gray-800 text-xl flex items-center gap-3">
          <FaStar className="text-amber-500" /> Jogue um quiz e teste seus
          conhecimentos nas diversas áreas do saber!
        </p>
        <div className="flex flex-col gap-[1px]">
          <div className="w-[55%] h-1 rounded-r-full bg-pink-800" />
          <div className="w-[57.5%] h-1 rounded-r-full bg-purple-600" />
          <div className="w-[60%] h-1 rounded-r-full bg-emerald-600" />
        </div>
      </header>
      <main className="w-full flex flex-col justify-center mb-auto">
        <div className="flex justify-between my-2 z-50">
          <div className="flex-1 mr-20">
            <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
              QUIZ rápido
            </h2>
            <div className="flex flex-col justify-center gap-4">
              <InlineQuiz
                title="Iniciar!"
                link="quiz"
                description="Questões aleatórias de todas as disciplicas"
                options={{
                  theme: "#a21caf",
                  titleAlign: "text-center",
                  textAlign: "text-center",
                }}
              />
              <InlineQuiz
                title="Configurar QUIZ"
                link="quiz"
                description="Configure disciplinas, tempo de resposta e mais..."
                options={{
                  theme: "#191970",
                  titleAlign: "text-center",
                  textAlign: "text-center",
                }}
              />
              <InlineQuiz
                title="Configurar QUIZ"
                link="quiz"
                description="Configure disciplinas, tempo de resposta e mais..."
                options={{
                  theme: "#0284c7",
                  titleAlign: "text-center",
                  textAlign: "text-center",
                }}
              />
            </div>
          </div>
          <div className="w-[30rem] rounded-2xl p-4 bg-slate-200 shadow-xl z-50">
            {!user ? (
              <>
                {/* <Radio /> */}
                <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                  Criar Conta
                </h2>
                <form className="w-full">
                  <div className="flex flex-col gap-2">
                    <Input
                      id="username"
                      label="Apelido"
                      placeholder="johndoe"
                      value={username}
                      setValue={setUsername}
                    />
                    <Input
                      id="email"
                      label="E-mail"
                      placeholder="johndoe@email.com"
                      value={email}
                      setValue={setEmail}
                    />
                    <PasswordInput
                      id="password"
                      label="Senha"
                      placeholder=""
                      value={password}
                      setValue={setPassword}
                    />
                    <PasswordInput
                      id="confirmPassword"
                      label="Confirmar Senha"
                      placeholder=""
                      value={confirmPassword}
                      setValue={setConfirmPassword}
                    />
                  </div>
                  <PasswordRules
                    password1={password}
                    password2={confirmPassword}
                  />
                  <motion.button
                    whileTap={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                    className="ml-auto flex justify-center items-center w-1/2 px-8 font-extrabold h-12 text-lg rounded-xl outline-none text-white bg-blue-700"
                    onClick={() => console.log("Confirmar")}
                  >
                    Confirmar
                  </motion.button>
                </form>
              </>
            ) : (
              <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                {user.username}
              </h2>
            )}
          </div>
        </div>
        <div className="my-2">
          <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
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

const User = () => {
  return (
    <div className="absolute flex items-center justify-center right-40 top-1/2 -translate-y-1/2 gap-8 z-[999]">
      <Avatar />
    </div>
  );
};

const Radio = () => {
  return (
    <div className="size-3 rounded-full outline outline-2 outline-offset-2 cursor-pointer outline-red-500 bg-red-500"></div>
  );
};
