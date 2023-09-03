"use client";

import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { configs } from "@/configs";

import styles from "@styles/Home.module.css";
import useQuizUser from "@/hooks/useQuizUser";
import Loading from "@/components/Loading";
import Link from "next/link";
import Image from "next/image";

export default function Home(): JSX.Element {
  const { quizUser, loading, logout } = useQuizUser();
  const router = useRouter();

  function navToProfile(): void {
    if (quizUser) {
      router.push(`${configs.routers.user.ROOT}/${quizUser.username}`);
    }
  }

  function navToLogin(): void {
    router.push(configs.routers.user.LOGIN);
  }

  return (
    <main className={styles.container}>
      {/* {loading && <Loading />} */}
      {!loading && (
        <div>
          <div className={styles.header}>
            <h1>Quiz!</h1>
          </div>
          <p className={styles.description}>
            Teste seus conhecimentos em campos básicos como ciências,
            matemática, direito, geografia e história brasileira e muito mais!
          </p>
          <hr />
          <nav className={styles.navContainers}>
            <li onClick={() => router.push(configs.routers.questionary.ROOT)}>
              Começar
            </li>
            <li onClick={() => router.push(configs.routers.CONFIG_QUIZ)}>
              Configurar Quiz
            </li>
            <li onClick={() => router.push(configs.routers.RANKING)}>
              Ranking
            </li>
            {!quizUser ? (
              <>
                <li onClick={() => router.push(configs.routers.user.LOGIN)}>
                  Fazer Login
                </li>
                <li onClick={() => router.push(configs.routers.user.REGISTER)}>
                  Criar Conta
                </li>
              </>
            ) : (
              <li onClick={logout}>Sair</li>
            )}
          </nav>
        </div>
      )}
      {!loading && (
        <>
          {quizUser ? (
            <div className={styles.avatarContainer}>
              {quizUser.avatar ? (
                <div className={styles.userAvatar}>
                  <img
                    src={quizUser?.avatar}
                    alt={`Avatar de ${quizUser?.username}`}
                    // width={50}
                    // height={50}
                    height={"100%"}
                    onClick={navToProfile}
                  />
                </div>
              ) : (
                <div
                  className={styles.nonAuthenticationIcon}
                  onClick={navToProfile}
                >
                  <FaUserCircle />
                </div>
              )}
              <span onClick={navToProfile} className={styles.userUsername}>
                {quizUser.username}
              </span>
              <span onClick={logout} className={styles.userLogin}>
                sair
              </span>
            </div>
          ) : (
            <div className={styles.avatarContainer}>
              <div
                className={styles.nonAuthenticationIcon}
                onClick={navToLogin}
              >
                <FaUserCircle />
              </div>
              <Link href={configs.routers.user.LOGIN} className={styles.login}>
                Login
              </Link>
              <Link
                href={configs.routers.user.REGISTER}
                className={styles.register}
              >
                Cadastrar
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
}
