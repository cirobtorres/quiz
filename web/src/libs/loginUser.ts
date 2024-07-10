import Cookies from "js-cookie";
import { UnauthorizedException } from "../exceptions/badcredentials.exceptions";

export default async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/user/login-access", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    if (response.status === 401) throw new UnauthorizedException();
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export const logoutUser = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/user/logout", {
    method: "POST",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) throw new UnauthorizedException();
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};
