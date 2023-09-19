"use client";

import Button from "@/components/Button";
import QuizInput from "@/components/QuizInput";
import useQuizUser from "@/hooks/useQuizUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./Login.module.css";
import { configs } from "@/configs";
import Link from "next/link";

export default function Login(): JSX.Element | void {
  const { quizUser, login } = useQuizUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    try {
      await login?.(username, password);
    } catch (error: any) {
      handleError("Usuário ou senha incorretos");
      // throw new Error(`Error during login. ${error}`);
    }
  }

  function handleError(error: string) {
    setTimeout(() => {
      setLoginError("");
    }, 5000);
    setLoginError(error);
  }

  return (
    <main className={styles.container}>
      <h1>Fazer Login</h1>
      <form>
        <QuizInput
          type="text"
          name="username"
          label="Apelido"
          required
          htmlFor={"username"}
          value={username}
          error={loginError}
          onChange={setUsername}
        />
        <QuizInput
          type="password"
          name="password"
          label="Senha"
          required
          htmlFor={"password"}
          value={password}
          error={loginError}
          onChange={setPassword}
        />
        <Button text="Entrar" onClick={handleSubmit} />
      </form>
      <hr className={styles.hr} />
      <Link
        href={configs.routers.user.REGISTER}
        className={styles.linkRegister}
      >
        Cadastre-se
      </Link>
      <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
        Home
      </Link>
    </main>
  );
}
