"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Avatar from "@/components/Avatar";
import { motion } from "framer-motion";
import QuizCard, { InlineQuiz } from "@/components/QuizCard";
import PasswordInput, {
  PasswordRules,
} from "../components/Inputs/PasswordInput";
import useUser from "@/hooks/useUser";
import Loading from "@/components/Loading";
import { UsernameInputB } from "../components/Inputs/UsernameInputs";
import { EmailInputA, EmailInputB } from "../components/Inputs/EmailInputs";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HomePageHeader />
      <main className="w-full flex flex-col justify-center mb-auto">
        <Presentation />
        <QuizBalloons />
        <QuizCards />
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
        link="quiz"
        options={{
          theme: "#93c5fd",
          border: "6px solid #3b82f6",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Sem limite de tempo!"
        link="quiz"
        options={{
          theme: "#fda4af",
          border: "6px solid #f43f5e",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Quiz Rápido!"
        link="quiz"
        options={{
          theme: "#bef264",
          border: "6px solid #84cc16",
          titleAlign: "text-center",
          textAlign: "text-center",
        }}
      />
      <InlineQuiz
        title="Configurar"
        link="quiz"
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

const radioOuterVariants = {
  unchecked: {
    outlineColor: "#fff",
  },
  checked: {
    outlineColor: "#22c55e",
    transition: {
      duration: 0.18,
      ease: "linear",
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
      duration: 0.18,
      ease: "linear",
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

const RegisterLoginCard = () => {
  const { user, loading } = useUser();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [email, setEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpUsernameError, setSignUpUsernameError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [emailError, setEmailError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [radioType, setRadioType] = useState<"signup" | "signin">("signup");
  return (
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
                  <UsernameInputB
                    id="signUpUsername"
                    label="Apelido"
                    placeholder="johndoe"
                    value={signUpUsername}
                    setValue={setSignUpUsername}
                    error={signUpUsernameError}
                    setError={setSignUpUsernameError}
                  />
                  <EmailInputB
                    id="email"
                    label="E-mail"
                    placeholder="johndoe@email.com"
                    value={email}
                    setValue={setEmail}
                    error={emailError}
                    setError={setEmailError}
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
              <form className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <EmailInputA
                    id="signInUsername"
                    label="E-mail"
                    placeholder="johndoe@email.com"
                    value={signInEmail}
                    setValue={setSignInEmail}
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
  );
};

const QuizCards = () => {
  return (
    <div className="my-2">
      <div className="grid grid-cols-4 gap-4">
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
  );
};
