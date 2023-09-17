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

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    let anyError = false;
    try {
      if (password !== confirmPassword) {
        handlePasswordError("Senhas não conferem");
        anyError = true;
      }
      if (validateUsername(username)) {
        anyError = true;
      }
      if (!anyError) {
        await register?.(username, password);
      }
    } catch (error: any) {
      handleUserError(error.message);
      // handleUserError("Usuário já existe");
      // throw new Error(`Error during register. ${error}`);
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  }

  function validateUsername(username: string): boolean {
    let error = false;
    if (username.length < 4 || username.length > 32) {
      handleUserError("Usuário deve ter entre 4 e 32 caracteres");
      error = true;
    }
    if (username.match(/[^a-zA-Z_]/g)) {
      handleUserError("Usuário deve conter apenas letras");
      error = true;
    }
    return error;
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
          helpText="Usuário deve conter apenas letras e ter entre 4 e 32 caracteres"
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
          helpText="A senha deve ser maior que 6 caracteres"
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
