"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValid } from "../../functions";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import CancelButton from "../../components/CancelButton";
import SubmitButton from "../../components/SubmitButton";
import useUser from "../../hooks/useUser";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const router = useRouter();

  const handleSignInSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (isValid(email) || isValid(password)) {
        return;
      }
      await login?.(email, password);
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <>
      <header className="w-1/2 mb-4">
        <h1 className="text-white text-3xl font-extrabold">Login</h1>
      </header>
      <main className="w-1/2 flex flex-col justify-center items-fenter gap-3">
        <form className="w-full flex flex-col justify-center items-fenter gap-3">
          <Input
            id="email"
            label="E-mail"
            placeholder="johndoe@email.com"
            value={email}
            setValue={setEmail}
            options={{ alternateDesign: true }}
          />
          <PasswordInput
            id="password"
            label="Senha"
            placeholder=""
            value={password}
            setValue={setPassword}
            options={{ alternateDesign: true }}
          />
          <div className="flex">
            <CancelButton text="Voltar" href="/" />
            <SubmitButton text="Entrar" onSubmit={handleSignInSubmit} />
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
      Não possui cadastro?
      <button
        type="button"
        onClick={() => router.push("criar-conta")}
        className="text-blue-500 font-bold underline"
      >
        Cadastrar
      </button>
    </span>
  );
};
