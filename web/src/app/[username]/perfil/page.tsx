"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useUser from "../../../hooks/useUser";
import PasswordInput, {
  PasswordRules,
} from "../../../components/Inputs/PasswordInput";
import { UsernameInputA } from "../../../components/Inputs/UsernameInputs";
import { EmailInputA } from "../../../components/Inputs/EmailInputs";
import { isValid } from "../../../functions";
import ProgressCircle from "../../../components/ProgressCircle";
import Loading from "../../../components/Loading";
import User from "../../../models/User";
import Breadcrums from "../../../components/Breadcrumbs";
import QuizPagination from "../../../components/QuizPagination";

export default function ProfilePage() {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col h-full min-h-screen px-1 bg-slate-300">
      <Breadcrums />
      <div className="flex gap-1 mb-1 break-fiendlist-into-column">
        <div className="w-full flex flex-col gap-1">
          <section className="w-full h-full flex gap-1 break-profile-into-column">
            <article className="w-full flex flex-col items-center gap-2 bg-slate-100 border border-white p-8 shadow-md rounded-md">
              {user ? (
                <UserProfileFolder user={user} />
              ) : (
                <div className="h-full flex justify-between items-center">
                  <Loading />
                </div>
              )}
            </article>
            <article className="w-full bg-slate-100 border border-white p-8 shadow-md rounded-md">
              <div className="w-full mb-4">
                <h3 className="text-slate-800 font-sans text-3xl font-extrabold uppercase">
                  Seus Quizzes
                </h3>
              </div>
              <UserQuizSettingsFolder />
            </article>
          </section>
          <UserScoreFolder />
        </div>
        <FriendsList />
      </div>
    </div>
  );
}

const UserProfileFolder = ({ user }: { user: User }) => {
  const { loading, update } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState<string>(user.getUsername);
  const [email, setEmail] = useState<string>(user.getEmail);
  const [usernameError, setUsernameError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [emailError, setEmailError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (isValid(username)) {
        // TODO: code
        return;
      }
      if (email.indexOf("@") === -1) {
        // TODO: code
        return;
      }
      if (password1 && isValid(password1)) {
        // TODO: code
        return;
      }

      const userData = {
        username: username,
        password: password1,
      };

      await update(userData);
      // router.push("/"); # TODO: replace with a flash message
    } catch (error) {
      throw error;
    } finally {
      setUsername(user?.getUsername ?? "");
      setEmail(user?.getEmail ?? "");
      setPassword1("");
      setPassword2("");
    }
  };

  return (
    <>
      <div className="mb-4 ml-0 mr-auto">
        <h3 className="font-sans text-3xl text-slate-800 font-extrabold uppercase truncate">
          {user.getUsername}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2 mb-auto">
        <UsernameInputA
          id="username"
          label="Apelido"
          placeholder="JohnDoe"
          value={username}
          setValue={setUsername}
        />
        <EmailInputA
          id="email"
          label="E-mail"
          placeholder="johndoe@email.com"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          id="password1"
          label="Senha"
          placeholder=""
          value={password1}
          setValue={setPassword1}
        />
        <PasswordInput
          id="password2"
          label="Confirmar Senha"
          placeholder=""
          value={password2}
          setValue={setPassword2}
        />
        <PasswordRules password1={password1} password2={password2} />
      </div>
      <motion.button
        whileTap={{ scale: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
        className="mx-auto w-full h-14 font-extrabold text-lg rounded-xl outline-none text-white bg-blue-700"
        onClick={handleSubmit}
      >
        Salvar
      </motion.button>
    </>
  );
};

const UserScoreFolder = () => {
  return (
    <div
      className="flex rounded-md gap-2 p-8 w-full border border-white shadow-md bg-slate-100" /*break-inner-score-column*/
    >
      <TotalScore />
      <div className="flex gap-2">
        <LastScore />
        <LastScore />
      </div>
    </div>
  );
};

const TotalScore = () => {
  return (
    <article className="w-full max-w-[55%] flex flex-col">
      <div className="w-full mb-4">
        <h3 className="text-slate-800 font-sans text-3xl font-extrabold uppercase">
          Pontuações
        </h3>
      </div>
      <div>
        <h3 className="text-slate-800 text-xl font-extrabold">
          Pontuação Total
        </h3>
      </div>
      <div className="flex break-inner-score-column gap-2">
        <ProgressCircle
          diameter={200}
          strokeWidth={15}
          percentage={Number(((59 / 88) * 100).toFixed(0))}
          style={{ fontSize: 40 }}
        />
        <div className="w-full flex flex-col gap-2">
          <p className="text-xs text-slate-500">
            Número de questões resolvidas: {119}
          </p>
          <p className="text-xs text-slate-500">
            Número de quiz completados: {16}
          </p>
          <p className="text-xs text-slate-500">
            Maior pontuação num quiz: {10}
          </p>
          <p className="text-xs text-slate-500">
            Menor pontuação num quiz: {10}
          </p>
          <p className="text-xs text-slate-500">
            Maior tempo gasto num quiz: {330} por questão
          </p>
          <p className="text-xs text-slate-500">
            Menor tempo gasto num quiz: {210} por questão
          </p>
          <p className="text-xs text-slate-500">
            Disciplina com maior chance de acerto:
            <br />
            <span className="font-extrabold">Geografia do Brasil</span>, índice:{" "}
            {39}/{45} de acertos ({94}%)
          </p>
        </div>
      </div>
      <div className="max-h-40 flex flex-wrap gap-1 mt-2">
        <ScoreTag subject="Geografia do Brasil" theme="#052e16" />
        <ScoreTag subject="História do Brasil" theme="#422006" />
        <ScoreTag subject="Ciência" theme="#172554" />
        <ScoreTag subject="Biologia Evolutiva" theme="#4d7c0f" />
        <ScoreTag subject="Português" theme="#1f2937" />
        <ScoreTag subject="Inglês" theme="#22d3ee" />
        <ScoreTag subject="Matemática Financeira" theme="#facc15" />
        <ScoreTag subject="Geografia do Brasil" theme="#052e16" />
        <ScoreTag subject="História do Brasil" theme="#422006" />
        <ScoreTag subject="Ciência" theme="#172554" />
        <ScoreTag subject="Biologia Evolutiva" theme="#4d7c0f" />
        <ScoreTag subject="Português" theme="#1f2937" />
        <ScoreTag subject="Inglês" theme="#22d3ee" />
        <ScoreTag subject="Matemática Financeira" theme="#facc15" />
        <ScoreTag subject="Geografia do Brasil" theme="#052e16" />
        <ScoreTag subject="História do Brasil" theme="#422006" />
        <Link
          href="#"
          className="flex justify-center items-center w-8 rounded-xl shadow-md border border-white text-cyan-600 bg-cyan-300"
        >
          ...
        </Link>
      </div>
    </article>
  );
};

const LastScore = () => {
  return (
    <article className="flex flex-col gap-2 p-8 w-full max-w-52 h-fit rounded-md shadow-md border border-white bg-slate-100">
      <div>
        <h3 className="text-slate-800 text-xl font-extrabold">Último Quiz</h3>
        <span className="text-slate-400 text-xs">
          ontem, 05 de julho de 2024
        </span>
      </div>
      <div className="mx-auto">
        <ProgressCircle diameter={120} strokeWidth={10} percentage={60} />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-slate-500 text-xs">Resolvido 10 questões</span>
        <span className="text-slate-500 text-xs">Total de 6 acertos</span>
      </div>
      <div className="flex flex-col gap-2">
        <ScoreTag subject="História do Brasil" theme="#422006" />
        <ScoreTag subject="Ciência" theme="#172554" />
      </div>
    </article>
  );
};

const ScoreTag = ({ subject, theme }: { subject: string; theme: string }) => {
  return (
    <Link
      href="#"
      className="h-fit text-white rounded-full flex justify-center items-center shadow-md overflow-hidden"
      style={{
        backgroundColor: theme,
      }}
    >
      <span className="text-xs py-0.5 px-2 text-nowrap">{subject}</span>
    </Link>
  );
};

const FriendsList = () => {
  return (
    <div className="min-w-[20%] p-8 bg-slate-100 border border-white rounded-md shadow-md">
      <div className="w-full mb-4">
        <h3 className="text-slate-800 font-sans text-3xl font-extrabold uppercase">
          Amigos
        </h3>
      </div>
    </div>
  );
};

const UserQuizSettingsFolder = () => {
  return (
    <section className="flex gap-2">
      <div className="flex flex-col gap-4 w-full h-[26rem]">
        <div className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-corner-transparent scrollbar-track-transparent pr-4 rounded-xl shadow-md bg-white">
          <div className="w-full [&>div:not(:last-child)]:border-b [&_div:not(:last-child)]:border-slate-100 overflow-hidden">
            <QuizListItem />
            <QuizListItem />
            <QuizListItem />
            <QuizListItem />
            <QuizListItem isPrivate={true} />
            <QuizListItem />
            <QuizListItem isPrivate={true} />
            <QuizListItem isPrivate={true} />
            <QuizListItem />
            <QuizListItem />
          </div>
        </div>
        <QuizPagination />
      </div>
    </section>
  );
};

const QuizListItem = ({ isPrivate = false }: { isPrivate?: boolean }) => {
  return (
    <div className="px-4 py-2 cursor-pointer hover:bg-slate-100">
      <div className="flex items-center gap-2">
        <span className="text-slate-800 font-extrabold">Quiz número 1</span>
        {isPrivate ? (
          <span className="h-fit flex justify-center items-center text-[0.55rem] text-red-600 px-[0.15rem] py-[0.1rem] rounded-xl bg-red-200">
            privado
          </span>
        ) : (
          <span className="h-fit flex justify-center items-center text-[0.55rem] text-blue-600 px-[0.15rem] py-[0.1rem] rounded-xl bg-blue-200">
            público
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <span className="text-[0.75rem] text-slate-400">Questões: 11</span>
        <span className="text-[0.75rem] text-slate-400">
          Atualizado ontem, 02-07-2024
        </span>
      </div>
    </div>
  );
};
