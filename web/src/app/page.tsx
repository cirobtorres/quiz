"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import { motion } from "framer-motion";
import Input from "../components/Input";
import QuizCard, { InlineQuiz } from "@/components/QuizCard";
import PasswordInput, { PasswordRules } from "../components/PasswordInput";
import useUser from "@/hooks/useUser";
import Loading from "@/components/Loading";

export default function HomePage() {
  const { user, loading } = useUser();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [email, setEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radioType, setRadioType] = useState<"signup" | "signin">("signup");
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
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loading />
              </div>
            ) : !user ? (
              <>
                <Radio radioType={radioType} setRadioType={setRadioType} />
                {radioType === "signup" ? (
                  <>
                    <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                      Criar Conta
                    </h2>
                    <form className="w-full">
                      <div className="flex flex-col gap-2">
                        <Input
                          id="signUpUsername"
                          label="Apelido"
                          placeholder="johndoe"
                          value={signUpUsername}
                          setValue={setSignUpUsername}
                        />
                        <Input
                          id="email"
                          label="E-mail"
                          placeholder="johndoe@email.com"
                          value={email}
                          setValue={setEmail}
                        />
                        <PasswordInput
                          id="signUpPassword"
                          label="Senha"
                          placeholder=""
                          value={signUpPassword}
                          setValue={setSignUpPassword}
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
                        password1={signUpPassword}
                        password2={confirmPassword}
                      />
                      <SubmitSignInSignOut />
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                      Fazer Login
                    </h2>
                    <form className="w-full">
                      <div className="flex flex-col gap-2">
                        <Input
                          id="signInUsername"
                          label="Apelido"
                          placeholder="johndoe"
                          value={signInUsername}
                          setValue={setSignInUsername}
                        />
                        <PasswordInput
                          id="signInPassword"
                          label="Confirmar Senha"
                          placeholder=""
                          value={signInPassword}
                          setValue={setSignInPassword}
                        />
                      </div>
                      <SubmitSignInSignOut />
                    </form>
                  </>
                )}
              </>
            ) : (
              <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                {user.getUsername}
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

const radioOuterVariants = {
  unchecked: {
    outlineColor: "#fff",
  },
  checked: {
    outlineColor: "#22c55e",
    transition: {
      duration: 0.1,
    },
  },
};

const radioInnerVariants = {
  unchecked: {
    scale: 0,
    backgroundColor: "#fff",
  },
  checked: {
    scale: 1,
    backgroundColor: "#22c55e",
    transition: {
      duration: 0.1,
    },
  },
};

const Radio = ({
  radioType,
  setRadioType,
}: {
  radioType: "signup" | "signin";
  setRadioType: (radioType: "signup" | "signin") => void;
}) => {
  return (
    <div className="mb-4 flex gap-3">
      <label
        htmlFor="signup"
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setRadioType("signup")}
      >
        <motion.div
          initial="checked"
          animate={`${radioType === "signup" ? "checked" : "unchecked"}`}
          variants={radioOuterVariants}
          className="relative size-[0.85rem] rounded-full outline outline-1 outline-offset-2 bg-white"
        >
          <input
            type="radio"
            name="action_type"
            id="signup"
            value="signup"
            defaultChecked
            hidden
          />
          <motion.div
            initial="checked"
            animate={`${radioType === "signup" ? "checked" : "unchecked"}`}
            variants={radioInnerVariants}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
        <span>Cadastrar</span>
      </label>
      <label
        htmlFor="signin"
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setRadioType("signin")}
      >
        <motion.div
          initial="checked"
          animate={`${radioType === "signin" ? "checked" : "unchecked"}`}
          variants={radioOuterVariants}
          className="relative size-[0.85rem] rounded-full outline outline-1 outline-offset-2 bg-white"
        >
          <input
            type="radio"
            name="action_type"
            id="signin"
            value="signin"
            hidden
          />
          <motion.div
            initial="unchecked"
            animate={`${radioType === "signin" ? "checked" : "unchecked"}`}
            variants={radioInnerVariants}
            transition={{ ease: "circInOut" }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
        <span>Fazer login</span>
      </label>
    </div>
  );
};

const SubmitSignInSignOut = () => {
  return (
    <motion.button
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        bounce: 0.5,
        duration: 0.5,
      }}
      className="ml-auto flex justify-center items-center w-1/2 px-8 font-extrabold h-12 text-lg rounded-xl outline-none text-white bg-blue-700"
      onClick={() => console.log("Confirmar")}
    >
      Confirmar
    </motion.button>
  );
};
