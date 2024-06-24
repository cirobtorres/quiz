"use client";

import { createContext, useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import getUserData from "../libs/getUserData";
import refreshSession from "../libs/refreshSession";
import loginUser from "../libs/loginUser";
import registerUser from "../libs/registerUser";

interface UserContextProps {
  user: UserProps | null;
  loading: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  register?: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  update?: (userData: FormData) => Promise<void>;
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

export function UserProvider(props: any): JSX.Element {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleToken = async ({
    access,
    refresh,
  }: {
    access: string;
    refresh: string;
  }) => {
    const accessPayload: DecodedTokenProps = jwtDecode(access);
    const refreshPayload: DecodedTokenProps = jwtDecode(refresh);

    Cookies.set("accessToken", access, {
      expires: accessPayload.exp,
    });
    Cookies.set("refreshToken", refresh, {
      expires: refreshPayload.exp,
    });

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
        setUser(userData);
      } catch (error) {
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
      throw new Error(`Error during login. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
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
      throw new Error(`Error during register. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {};

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
      value={{ user, loading, login, logout, register, update }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
