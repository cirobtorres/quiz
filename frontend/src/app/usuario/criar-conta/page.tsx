"use client";

import Button from "@/components/Button";
import QuizInput from "@/components/QuizInput";
import useQuizUser from "@/hooks/useQuizUser";
import { useState } from "react";

import styles from "./CreateUser.module.css";
import Link from "next/link";
import { configs } from "@/configs";

export default function CreateQuizUser(): JSX.Element {
  const { quizUser, login, register } = useQuizUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        handlePasswordError("Senhas não conferem");
      }
      await register?.(username, password, confirmPassword);
    } catch (error: any) {
      handleUserError("Usuário já existe");
      // throw new Error(`Error during register. ${error}`);
    }
  }

  function handleUserError(error: string) {
    setTimeout(() => {
      setUsernameError("");
    }, 5000);
    setUsernameError(error);
  }

  function handlePasswordError(error: string) {
    setTimeout(() => {
      setPasswordError("");
      setConfirmPasswordError("");
    }, 5000);
    setPasswordError(error);
    setConfirmPasswordError(error);
  }

  return (
    <main className={styles.container}>
      <h1>Criar Conta</h1>
      <form>
        <QuizInput
          type={"text"}
          name="username"
          label="Apelido"
          value={username}
          error={usernameError}
          required
          htmlFor={"username"}
          onChange={setUsername}
        />
        <QuizInput
          type={"password"}
          name="password"
          label="Senha"
          value={password}
          error={passwordError}
          required
          htmlFor={"password"}
          onChange={setPassword}
        />
        <QuizInput
          type={"password"}
          name="password-confirmation"
          label="Confirme a Senha"
          value={confirmPassword}
          error={confirmPasswordError}
          required
          htmlFor={"confirmPassword"}
          onChange={setConfirmPassword}
        />
        <Button text="Confirmar" onClick={handleSubmit} />
      </form>
      <hr className={styles.hr} />
      <Link href={configs.routers.user.LOGIN} className={styles.linkLogIn}>
        Login
      </Link>
      <Link href={configs.routers.HOME} className={styles.linkBackToHome}>
        Voltar
      </Link>
    </main>
  );
}
