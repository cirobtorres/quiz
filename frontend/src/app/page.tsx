"use client";

import { useRouter } from "next/navigation";

import useQuizUser from "@/hooks/useQuizUser";
import Loading from "@/components/Loading";
import UserProfile from "@/components/UserProfile";
import { configs } from "@/configs";
import styles from "@styles/Home.module.css";

export default function Home(): JSX.Element {
  const { quizUser, loading, logout } = useQuizUser();
  const router = useRouter();

  return (
    <main className={styles.container}>
      <UserProfile />
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
            <li onClick={() => router.push(configs.routers.configQuiz.ROOT)}>
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
