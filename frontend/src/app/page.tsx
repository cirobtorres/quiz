"use client";

import { useRouter } from "next/navigation";

import useQuizUser from "@/hooks/useQuizUser";
import Loading from "@/components/Loading";
import UserProfile from "@/components/UserProfile";
import { configs } from "@/configs";
import styles from "./Home.module.css";

export default function Home(): JSX.Element {
  const { quizUser, loading, logout } = useQuizUser();
  const router = useRouter();

  function startQuiz() {
    if (!quizUser) return;
    router.push(configs.routers.questionary.ROOT);
  }

  function configQuiz() {
    if (!quizUser) return;
    router.push(configs.routers.configQuiz.ROOT);
  }

  return (
    <main className={styles.container}>
      <UserProfile />
      {!loading && (
        <div>
          <div className={styles.header}>
            <h1>Quiz!</h1>
          </div>
          <hr />
          <nav className={styles.navContainers}>
            <li
              onClick={startQuiz}
              style={!quizUser ? { color: "#ccc", fontWeight: 400 } : {}}
            >
              Começar
            </li>
            <li onClick={configQuiz} style={!quizUser ? { color: "#ccc" } : {}}>
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
    </main>
  );
}
