"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValid } from "../../functions";
import Input from "../../components/Input";
import PasswordInput, { PasswordRules } from "../../components/PasswordInput";
import CancelButton from "../../components/CancelButton";
import SubmitButton from "../../components/SubmitButton";
import useUser from "../../hooks/useUser";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState(""); // Password confirmation
  const { register } = useUser();
  const router = useRouter();

  const handleSignUpSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (
        email.indexOf("@") === -1 ||
        isValid(username) ||
        isValid(password1)
      ) {
        return;
      }
      await register?.(username, email, password1);
      router.push("/");
    } catch (error) {
      throw new Error(`Error during register: ${error}`);
    } finally {
      // setUsername("");
      // setEmail("");
      // setPassword1("");
      // setPassword2("");
    }
  };

  return (
    <>
      <header className="w-1/2 mb-4">
        <h1 className="text-white text-3xl font-extrabold">Cadastrar</h1>
      </header>
      <main className="w-1/2 flex flex-col justify-center items-fenter gap-3">
        <form className="w-full flex flex-col justify-center items-fenter gap-3">
          <Input
            id="username"
            label="Apelido"
            placeholder="johndoe"
            value={username}
            setValue={setUsername}
            options={{ alternateDesign: true }}
          />
          <Input
            id="email"
            label="E-mail"
            placeholder="johndoe@email.com"
            value={email}
            setValue={setEmail}
            options={{ alternateDesign: true }}
          />
          <PasswordInput
            id="password1"
            label="Senha"
            placeholder="abc"
            value={password1}
            setValue={setPassword1}
            options={{ alternateDesign: true }}
          />
          <PasswordInput
            id="password2"
            label="Confirmar Senha"
            placeholder="abc"
            value={password2}
            setValue={setPassword2}
            options={{ alternateDesign: true }}
          />
          <PasswordRules password1={password1} password2={password2} />
          <div className="flex">
            <CancelButton text="Voltar" href="/" />
            <SubmitButton text="Criar" onSubmit={handleSignUpSubmit} />
          </div>
        </form>
        <RedirectButton />
      </main>
    </>
  );
}

const RedirectButton = () => {
  const router = useRouter();
  return (
    <span className="text-white flex gap-1 justify-center">
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
