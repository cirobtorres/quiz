"use client";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import registerUser from "@/libs/registerUser";
import loginUser from "@/libs/loginUser";
import { configs } from "@/configs";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/libs/updateUser";
import uploadPref from "@/libs/updatePreferences";
import { updateToken } from "@/libs/updateToken";
import getPreferences from "@/libs/getPreferences";

interface QuizUserContextProps {
  quizUser?: QuizUserPreferences | null;
  loading?: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  register?: (username: string, password: string) => Promise<void>;
  updateQuizUser?: (userData: FormData) => Promise<void>;
  updatePreferences: (userData: FormData) => Promise<void>;
}

const QuizUserContext = createContext<QuizUserContextProps>(
  {} as QuizUserContextProps
);

export function QuizUserProvider(props: any): JSX.Element {
  const [quizUser, setQuizUser] = useState<QuizUserPreferences | null>(null);
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
        preferences_user,
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
      preferences_user,
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
      const preferences = await getPreferences(userData.id);
      const newUserData: QuizUserPreferences = {
        ...userData,
        preferences: preferences,
      };
      setQuizUser(newUserData);
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

  async function register(username: string, password: string): Promise<void> {
    try {
      setLoading(true);
      await registerUser(username, password);
      await login(username, password);
    } catch (error) {
      throw new Error(`Error during register. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuizUser(userData: FormData): Promise<void> {
    const data: encodedToken = await updateUser(userData);
    await sessionConfigure(data);
  }

  async function updatePreferences(userData: FormData): Promise<void> {
    try {
      setLoading(true);
      await uploadPref(userData);
      await refreshingValidToken();
    } catch (error: any) {
      throw new Error(`Error at QuizSettingsProvider during update: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function refreshingValidToken(): Promise<void> {
    setLoading(true);
    const response: Response = await updateToken();
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
      refreshingValidToken();
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
        updateQuizUser,
        updatePreferences,
      }}
    >
      {props.children}
    </QuizUserContext.Provider>
  );
}

export default QuizUserContext;
