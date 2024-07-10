import Cookies from "js-cookie";

// export async function updateUser(userData: FormData) {
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
