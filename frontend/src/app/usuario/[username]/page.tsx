"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useQuizUser from "@/hooks/useQuizUser";
import QuizInput from "@/components/QuizInput";
import styles from "./UserProfile.module.css";
import Link from "next/link";
import ConfirmationBox from "@/components/ConfirmationBox";
import AvatarHandler from "@/components/AvatarHandler";

interface userDataProps {
  id: number;
  username?: string | null;
  password?: string | null;
  avatar?: File | null;
}

function formatDateTime(date: string, formatDate: string | null = null) {
  // formatDate = "/" or "-"
  try {
    const datetime = date.split(" ");
    return (
      <span>
        <b>{datetime[0].replace(/-/g, formatDate ? formatDate : "-")}</b> às{" "}
        {datetime[1]}
      </span>
    );
  } catch (error) {
    return (
      <span>
        <b>{date}</b>
      </span>
    );
  }
}

export default function UserProfile(): JSX.Element {
  const { quizUser, loading, update } = useQuizUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [imageError, setImageError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter();

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    setIsOpen(false);
    if (!quizUser) {
      throw new Error("User not found");
    }
    if (password !== passwordConfirmation) {
      handlePasswordError("As senhas devem ser iguais");
      return;
    }
    if (selectedImage && selectedImage.size > 2.0 * 1024 * 1024) {
      handleImageError("Imagem deve ter menos de 2MB");
      return;
    }
    const userData = new FormData();
    userData.append("id", quizUser.id.toString());
    userData.append("username", username ? username : "");
    userData.append("password", password ? password : "");
    userData.append("avatar", selectedImage ? selectedImage : "");
    if (!userData) {
      throw new Error("No data to update");
    }
    await update?.(userData);
    router.push("/");
  }

  function handleImageError(error: string) {
    setTimeout(() => {
      setImageError("");
    }, 5000);
    setImageError(error);
  }

  function handlePasswordError(error: string) {
    setTimeout(() => {
      setPasswordError("");
    }, 5000);
    setPasswordError(error);
  }

  return (
    <>
      {/* {!quizUser && <Loading />} */}
      {quizUser && (
        <>
          <form className={styles.formContainer} encType="multipart/form-data">
            <h1 className={styles.header}>Meus dados</h1>
            <QuizInput
              type="text"
              name="username"
              label="Apelido"
              value={username}
              placeholder={quizUser.username}
              htmlFor="username"
              onChange={(value) => setUsername(value)}
            />
            <div className={styles.passwordContainer}>
              <h2 className={styles.passwordHeader}>Mudar Senha?</h2>
              <QuizInput
                type="password"
                name="password"
                label="Senha"
                value={password}
                error={passwordError}
                htmlFor="password"
                onChange={(value) => setPassword(value)}
              />
              <QuizInput
                type="password"
                name="passwordConfirmation"
                label="Confirmar Senha"
                value={passwordConfirmation}
                error={passwordError}
                htmlFor="confirmPassword"
                onChange={(value) => setPasswordConfirmation(value)}
              />
            </div>
            <AvatarHandler
              username={quizUser.username}
              avatar={quizUser.avatar}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              error={imageError}
            />
            <div className={styles.datetimeContainer}>
              <span>
                Última entrada de login:
                <br />
                {formatDateTime(quizUser.last_login, "/")}
              </span>
              <hr />
              <span>
                Data de criação do usuário:
                <br />
                {formatDateTime(quizUser.created_at, "/")}
              </span>
            </div>
          </form>
          <ConfirmationBox
            text="Salvar"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            confirmAction={handleSubmit}
          />
          <Link href="/" className={styles.link}>
            Voltar
          </Link>
        </>
      )}
    </>
  );
}
