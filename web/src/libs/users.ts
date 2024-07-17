import Cookies from "js-cookie";
import { UnauthorizedException } from "../exceptions/badcredentials.exceptions";

export async function loginUser({
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

export async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
}

export async function getUserImage() {}

export async function postUserImage(formData: FormData) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/media-app/user-image",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function putUserImage(formData: FormData) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/media-app/user-image",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function deleteUserImage() {}

export async function updateUser(userData: {
  username: string;
  password: string;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/user/update", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}

export async function refreshSession() {
  const response = await fetch("http://127.0.0.1:8000/api/user/login-refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: Cookies.get("refreshToken"),
    }),
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
  return response;
}

export async function getUserData({
  token_type,
  user_id,
}: {
  token_type: string;
  user_id: number;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/user/get-data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
  return await response.json();
}
