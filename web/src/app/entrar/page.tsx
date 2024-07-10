"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValid } from "../../functions";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { motion } from "framer-motion";
import useUser from "../../hooks/useUser";
import { UnauthorizedException } from "../../exceptions/badcredentials.exceptions";
import { UsernameInputA } from "../../components/Inputs/UsernameInputs";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const router = useRouter();

  const handleSignInSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isValid(email) || isValid(password)) {
        return;
      }
      await login?.(email, password);
      router.push("/");
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        setError(error.message);
        return new Response(error.message, { status: error.status });
      }
      throw error;
    } finally {
      setLoading(false);
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 w-1/2 flex flex-col justify-center bg-slate-200 py-8">
      <header className="w-1/2 mx-auto mb-4">
        <h1 className="text-slate-900 text-4xl text-center font-extrabold font-sans uppercase">
          Login
        </h1>
      </header>
      <main className="w-1/2 mx-auto flex flex-col justify-center items-fenter gap-3">
        <form className="w-full flex flex-col justify-center items-fenter gap-3">
          <UsernameInputA
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
          <div className="flex items-center h-8">
            {error ? <span className="text-red-500">{error}</span> : null}
          </div>
          <div className="flex">
            <SubmitButton
              text="Entrar"
              loading={loading}
              onSubmit={handleSignInSubmit}
            />
          </div>
        </form>
        <RedirectButton />
      </main>
    </div>
  );
}

const SubmitButton = ({
  text,
  loading,
  onSubmit,
}: {
  text: string;
  loading: boolean;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <motion.button
      disabled={loading}
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      className="flex-1 mx-auto w-full max-w-[50%] font-extrabold h-12 text-lg rounded-xl outline-none text-white bg-blue-700"
      onClick={(event) => onSubmit(event)}
    >
      {text}
    </motion.button>
  );
};

const RedirectButton = () => {
  const router = useRouter();
  return (
    <span className="text-slate-500 font-bold flex gap-1 justify-center">
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
