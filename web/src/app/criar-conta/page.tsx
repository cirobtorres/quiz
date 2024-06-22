"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <header className="w-1/2 mb-4">
        <h1 className="text-white text-3xl font-extrabold">Cadastrar</h1>
      </header>
      <main className="w-1/2 flex flex-col justify-center items-fenter gap-3">
        <Input
          id="username"
          label="Apelido"
          value={username}
          setValue={setUsername}
          placeholder="JohnDoe"
        />
        <PasswordInput
          id="password"
          label="Senha"
          value={password}
          setValue={setPassword}
          placeholder=""
        />
        <div className="flex">
          <CancelButton text="Voltar" />
          <ConfirmButton text="Criar" />
        </div>
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
