"use client";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import registerUser from "@/libs/registerUser";
import loginUser from "@/libs/loginUser";
import { configs } from "@/configs";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface userDataProps {
  id: number;
  username?: string | null;
  password?: string | null;
  avatar?: File | null;
}

interface QuizUserContextProps {
  quizUser?: QuizUser | null;
  loading?: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  register?: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  // updateUser?: (userData: userDataProps) => Promise<void>;
  updateUser?: (userData: FormData) => Promise<void>;
}

const QuizUserContext = createContext<QuizUserContextProps>(
  {} as QuizUserContextProps
);

export function QuizUserProvider(props: any): JSX.Element {
  const [quizUser, setQuizUser] = useState<QuizUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function handleTokens(token: encodedToken) {
    const payload: Token = jwt_decode(token.access);
    Cookies.set("accessToken", token.access, {
      expires: configs.cookies.EXPIRES,
    });
    Cookies.set("refreshToken", token.refresh, {
      expires: configs.cookies.EXPIRES,
    });
    const {
      userData: {
        id,
        username,
        avatar,
        get_total_correct_answers,
        score,
        is_active,
        is_staff,
        last_login,
        created_at,
        updated_at,
      },
    }: Token = payload;
    return {
      id,
      username,
      avatar,
      get_total_correct_answers,
      score,
      is_active,
      is_staff,
      last_login,
      created_at,
      updated_at,
    };
  }

  async function sessionConfigure(
    token: encodedToken | null
  ): Promise<string | boolean> {
    if (token) {
      const userData: QuizUser = await handleTokens(token);
      if (userData.avatar) {
        userData.avatar = `http://127.0.0.1:8000/${userData.avatar}`;
      }
      setQuizUser(userData);
      setLoading(false);
      return userData.username;
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setQuizUser(null);
      setLoading(false);
      return false;
    }
  }

  async function login(username: string, password: string): Promise<void> {
    const userData = {
      username,
      password,
    };
    try {
      setLoading(true);
      const token: encodedToken = await loginUser(userData);
      await sessionConfigure(token);
      router.push("/");
    } catch (error) {
      throw new Error(`Error during login. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      setLoading(true);
      await sessionConfigure(null);
      router.push("/");
    } catch (error) {
      throw new Error(`Error during logout. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function register(
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error("As senhas não conferem");
      }
      await registerUser(username, password);
      await login(username, password);
    } catch (error) {
      throw new Error(`Error during register. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(userData: FormData): Promise<void> {
    // async function updateUser(userData: userDataProps): Promise<void> {
    console.log("userData", userData);
    const response: Response = await fetch(
      `${configs.urls.user.UPDATE}/${userData.get("id")}`,
      // `${configs.urls.user.UPDATE}/${userData.id}`,
      {
        method: "PUT",
        body: userData,
        // body: JSON.stringify(userData),
        headers: {
          // "fetch" will automatically set Content-Type header to multipart/form-data
          // Passing the header manually will cause an error
          // "Content-Type": "multipart/form-data",
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    if (response.ok) {
      const data: encodedToken = await response.json();
      await sessionConfigure(data);
    } else {
      throw new Error(
        `Error awaiting updateUser method: ${response.status} (${response.statusText}`
      );
    }
  }

  async function updateToken(): Promise<encodedToken | void> {
    setLoading(true);

    const response: Response = await fetch(configs.urls.token.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: Cookies.get("refreshToken"),
      }),
    });

    const token: encodedToken = await response.json();

    if (response.ok) {
      await sessionConfigure(token);
    } else {
      await logout();
    }
    setLoading(false);
  }

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      updateToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <QuizUserContext.Provider
      value={{
        quizUser,
        loading,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {props.children}
    </QuizUserContext.Provider>
  );
}

export default QuizUserContext;
