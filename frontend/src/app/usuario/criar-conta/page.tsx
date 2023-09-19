"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import QuizInput from "@/components/QuizInput";
import useQuizUser from "@/hooks/useQuizUser";

import styles from "./CreateUser.module.css";
import { configs } from "@/configs";
import validatePassword from "@/functions/validations/validatePassword";
import validateUsername from "@/functions/validations/validateUsername";

export default function CreateQuizUser(): JSX.Element {
  const { register } = useQuizUser();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string[] | null>(null);
  const [passwordError, setPasswordError] = useState<string[] | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string[] | null
  >(null);

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    try {
      const usernameErrors: Promise<{ error: boolean; arrayError: string[] }> =
        validateUsername(username);
      const passwordErrors: { error: boolean; arrayError: string[] } =
        validatePassword(password, confirmPassword);
      const validateUsernameError = await usernameErrors;
      if (validateUsernameError.error || passwordErrors.error) {
        validateUsernameError.arrayError.length &&
          handleUserError(validateUsernameError.arrayError);
        passwordErrors.arrayError.length &&
          handlePasswordError(passwordErrors.arrayError);
      } else {
        await register?.(username, password);
      }
    } catch (error: any) {
      throw new Error(`Error during register: ${error}`);
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  }

  function handleUserError(error: string[], timeout?: number) {
    setTimeout(() => {
      setUsernameError(null);
    }, timeout || 7000);
    setUsernameError(error);
  }

  function handlePasswordError(error: string[], timeout?: number) {
    setTimeout(() => {
      setPasswordError(null);
      setConfirmPasswordError(null);
    }, timeout || 7000);
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
          error={usernameError as string[]}
          required
          htmlFor={"username"}
          onChange={setUsername}
          helpText="Usuário deve ter entre 4 e 32 caracteres, conter apenas letras e _"
        />
        <QuizInput
          type={"password"}
          name="password"
          label="Senha"
          value={password}
          error={passwordError as string[]}
          required
          htmlFor={"password"}
          onChange={setPassword}
          helpText="A senha deve ser maior que 6 caracteres e ter apenas letras e números"
        />
        <QuizInput
          type={"password"}
          name="password-confirmation"
          label="Confirme a Senha"
          value={confirmPassword}
          error={confirmPasswordError as string[]}
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
        Home
      </Link>
    </main>
  );
}
