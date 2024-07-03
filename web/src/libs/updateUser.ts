import Cookies from "js-cookie";

export async function updateUser(userData: FormData) {
  const response = await fetch("http://127.0.0.1:8000/api/user/update", {
    method: "PUT",
    body: userData,
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}
