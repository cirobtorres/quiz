"use client";

import { useState } from "react";
import useUser from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiArrowDropLeftLine } from "react-icons/ri";
import LoginPasswordInput, {
  PasswordRules,
} from "../../../components/Inputs/PasswordInput";
import { UsernameInputA } from "../../../components/Inputs/UsernameInputs";
import { EmailInputA } from "../../../components/Inputs/EmailInputs";
import { isValid } from "../../../functions";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (!user && !loading) {
    router.push("/");
  }

  const [switchPage, setSwitchPage] = useState<"Profile" | "Quiz">("Profile");

  const Folder = () => {
    switch (switchPage) {
      case "Profile":
        return <UserProfileFolder />;
      case "Quiz":
        return <UserQuizSettingsPage />;
    }
  };

  const folderHeight = 38; // rem
  const folderPadding = 2; // rem

  return (
    <div className="w-[80%] my-8">
      <button
        className={`w-40 py-3 px-8 rounded-t-xl ${
          switchPage === "Profile" ? "bg-slate-200" : "bg-slate-600"
        }
      `}
        onClick={() => setSwitchPage("Profile")}
      >
        Perfil
      </button>
      <button
        className={`w-40 py-3 px-8 rounded-t-xl ${
          switchPage === "Quiz" ? "bg-slate-200" : "bg-slate-600"
        }
      `}
        onClick={() => setSwitchPage("Quiz")}
      >
        Quiz
      </button>
      <div
        className={`relative w-full p-8 rounded-xl 
          ${switchPage === "Profile" ? "rounded-tl-none" : null} bg-slate-200`}
        style={{
          height: `${folderHeight}rem`,
          padding: `${folderPadding}rem`,
        }}
      >
        <GrayFolderBackground />
        <Folder />
      </div>
    </div>
  );
}

const GrayFolderBackground = () => {
  return (
    <div className="absolute inset-0 rounded-xl rounded-tl-none bg-slate-600 -z-10" />
  );
};

const UserProfileFolder = () => {
  const { user, update } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState(user?.getUsername ?? "");
  const [email, setEmail] = useState(user?.getEmail ?? "");
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
  const [image, setImage] = useState<File | null>(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

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
      if (image && image.size > 2.0 * 1024 * 1024) {
        // TODO: code
        return;
      }
      if (password1 && isValid(password1)) {
        // TODO: code
        return;
      }

      const userData = new FormData();
      userData.append("id", user?.getId.toString() ?? "0");
      userData.append("username", username ? username : "");
      userData.append("password", password1 ? password1 : "");
      userData.append("avatar", image ? image : "");

      if (userData.get("id") === "0")
        throw new Error("Something went wrong...");

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
      <header className="w-full mx-auto flex flex-col items-center mb-4">
        <h1 className="text-7xl font-extrabold text-slate-800">Perfil</h1>
      </header>
      <main className="flex gap-4 mx-auto items-center">
        <div className="w-full flex flex-col justify-center items-center mb-auto">
          <div className="relative size-72 border-8 rounded-full border-dashed border-blue-500">
            <input
              type="file"
              className="absolute inset-0 bg-red-500 cursor-pointer rounded-full opacity-0"
              onChange={handleOnChange}
            />
            {user?.getAvatar && !image ? (
              <Image
                src={user?.getAvatar}
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            ) : image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            ) : (
              <Image
                src="/images/user/avatar/1281x1281-user-icon.png"
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            )}
          </div>
          <div className="flex items-center h-8">
            {image ? (
              <span className="text-xl text-slate-800">{image.name}</span>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
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
          <LoginPasswordInput
            id="password1"
            label="Senha"
            placeholder=""
            value={password1}
            setValue={setPassword1}
          />
          <LoginPasswordInput
            id="password2"
            label="Confirmar Senha"
            placeholder=""
            value={password2}
            setValue={setPassword2}
          />
          <PasswordRules password1={password1} password2={password2} />
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
            className="mx-auto w-full font-extrabold h-14 text-lg rounded-xl outline-none text-white bg-blue-700"
            onClick={handleSubmit}
          >
            Salvar
          </motion.button>
        </div>
      </main>
    </>
  );
};

const UserQuizSettingsPage = () => {
  const { user } = useUser();
  const [quizName, setQuizName] = useState("");
  return (
    <>
      <header className="w-full mx-auto flex flex-col items-center mb-4">
        <h1 className="text-7xl font-extrabold text-slate-800">
          Configurar Quiz
        </h1>
      </header>
      <main className="flex gap-4">
        <div className="flex flex-col gap-4 w-full h-96">
          <h2 className="text-2xl font-extrabold text-slate-800">
            Seus quizes salvos
          </h2>
          <div className={`w-full h-full overflow-auto p-1`}>
            <div className="[&>div:not(:last-child)]:border-b [&_div:not(:last-child)]:border-slate-100 overflow-hidden">
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
              <QuizListItem />
            </div>
          </div>
          <Pagination />
        </div>
        {/* <div className="w-full flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-slate-800">...</h2>
          <UsernameInputA
            id="quiz"
            label="Disciplina"
            placeholder="Ciências Naturais"
            value={quizName}
            setValue={setQuizName}
          />
          <UsernameInputA
            id="quiz"
            label="Disciplina"
            placeholder="Ciências Naturais"
            value={quizName}
            setValue={setQuizName}
          />
          <UsernameInputA
            id="quiz"
            label="Disciplina"
            placeholder="Ciências Naturais"
            value={quizName}
            setValue={setQuizName}
          />
          <UsernameInputA
            id="quiz"
            label="Disciplina"
            placeholder="Ciências Naturais"
            value={quizName}
            setValue={setQuizName}
          />
          <UsernameInputA
            id="quiz"
            label="Disciplina"
            placeholder="Ciências Naturais"
            value={quizName}
            setValue={setQuizName}
          />
        </div> */}
      </main>
    </>
  );
};

const QuizListItem = () => {
  return (
    <div className="px-4 py-2 cursor-pointer hover:bg-slate-100">
      <div className="flex items-center gap-2">
        <span className="text-slate-800 font-extrabold">Quiz número 1</span>
        <span className="h-fit flex justify-center items-center text-[0.55rem] text-blue-600 px-[0.15rem] py-[0.1rem] rounded-xl bg-blue-200">
          público
        </span>
      </div>
      <div className="flex gap-4">
        <span className="text-[0.75rem]">Questões: 11</span>
        <span className="text-[0.75rem]">Atualizado ontem, 02-07-2024</span>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex justify-center gap-2">
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        <RiArrowDropLeftLine className="text-2xl" />
      </button>
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        1
      </button>
      <div className="w-4" />
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        5
      </button>
      <button className="w-8 h-6 flex justify-center items-center text-sm font-extrabold text-white rounded bg-blue-600">
        6
      </button>
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        7
      </button>
      <div className="w-4" />
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        18
      </button>
      <button className="w-8 h-6 flex justify-center items-center text-sm text-slate-800 rounded bg-white hover:bg-slate-100">
        <RiArrowDropLeftLine className="text-2xl rotate-180" />
      </button>
    </div>
  );
};
