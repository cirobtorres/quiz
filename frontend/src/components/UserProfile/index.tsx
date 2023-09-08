"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

import useQuizUser from "@/hooks/useQuizUser";
import styles from "./UserProfile.module.css";
import { useRouter } from "next/navigation";
import { configs } from "@/configs";

export default function UserProfile() {
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
    !loading && (
      <>
        {quizUser ? (
          <div className={styles.avatarContainer}>
            {quizUser.avatar ? (
              <div className={styles.userAvatar}>
                <img
                  src={quizUser?.avatar}
                  alt={`Avatar de ${quizUser?.username}`}
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
            <div className={styles.nonAuthenticationIcon} onClick={navToLogin}>
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
    )
  );
}
