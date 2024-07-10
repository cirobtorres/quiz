"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValid } from "../../functions";
import SubmitButton from "../../components/SubmitButton";
import useUser from "../../hooks/useUser";
import PasswordInput, {
  PasswordRules,
} from "../../components/Inputs/PasswordInput";
import { UsernameInputB } from "../../components/Inputs/UsernameInputs";
import { EmailInputB, EmailInputD } from "../../components/Inputs/EmailInputs";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState(""); // Password confirmation
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
  const { register } = useUser();
  const router = useRouter();

  const handleSignUpSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (
        email.indexOf("@") === -1 ||
        isValid(username) ||
        isValid(password1) ||
        usernameError ||
        emailError
      ) {
        return;
      }
      await register?.(username, email, password1);
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      // setUsername("");
      // setEmail("");
      // setPassword1("");
      // setPassword2("");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 w-1/2 flex flex-col justify-center bg-slate-200 py-8">
      <header className="w-1/2 mx-auto mb-8">
        <h1 className="text-slate-900 text-4xl text-center font-extrabold font-sans uppercase">
          Cadastrar
        </h1>
      </header>
      <main className="w-1/2 mx-auto flex flex-col justify-center items-fenter gap-3">
        <form className="w-full flex flex-col justify-center items-fenter gap-3">
          <UsernameInputB
            id="username"
            label="Apelido"
            placeholder="johndoe"
            value={username}
            setValue={setUsername}
            error={usernameError}
            setError={setUsernameError}
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
          <div className="flex">
            <SubmitButton text="Criar" onSubmit={handleSignUpSubmit} />
          </div>
        </form>
        <RedirectButton />
      </main>
    </div>
  );
}

const RedirectButton = () => {
  const router = useRouter();
  return (
    <span className="text-slate-500 font-bold flex gap-1 justify-center">
      Já possui cadastro? Fazer
      <button
        type="button"
        onClick={() => router.push("entrar")}
        className="text-blue-500 font-bold underline"
      >
        login
      </button>
    </span>
  );
};
