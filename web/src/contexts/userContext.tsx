"use client";

import { createContext, useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import User from "@/models/User";
import {
  getUserData,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  updateUser,
} from "@/libs/users";

interface UserContextProps {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  // update: (userData: FormData) => Promise<void>;
  update: (userData: { username: string; password: string }) => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface TokenProps {
  access: string;
  refresh: string;
}

interface DecodedTokenProps extends JwtPayload {
  token_type: string;
  user_id: number;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider(props: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleToken = async ({
    access,
    refresh,
  }: {
    access: string;
    refresh: string;
  }) => {
    const accessPayload: DecodedTokenProps = jwtDecode(access);

    Cookies.set("accessToken", access, {
      expires: accessPayload.exp,
    });

    if (refresh) {
      const refreshPayload: DecodedTokenProps = jwtDecode(refresh);

      Cookies.set("refreshToken", refresh, {
        expires: refreshPayload.exp,
      });
    }

    const { token_type, user_id } = accessPayload;

    return {
      token_type,
      user_id,
    };
  };

  const session = async (token: TokenProps | null) => {
    if (token) {
      try {
        const { token_type, user_id } = await handleToken(token);
        const userData = await getUserData({ token_type, user_id });
        setUser(User.create(userData));
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const token = await loginUser({ email, password });
      await session(token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      await session(null);
    } catch (error) {
      throw new Error(`Error during logout. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      await registerUser({ username, email, password });
      await login(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const update = async (userData: FormData) => {
  const update = async (userData: { username: string; password: string }) => {
    try {
      setLoading(true);
      const updatedTokens = await updateUser(userData);
      await session(updatedTokens);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setLoading(true);
    const response = await refreshSession();
    const token = await response.json();
    if (response.ok) {
      await session(token);
    } else {
      await logout();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, login, logout, register, update, refreshToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
