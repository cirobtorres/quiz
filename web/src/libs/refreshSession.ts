import Cookies from "js-cookie";

export default async function refreshSession() {
  const response = await fetch("http://127.0.0.1:8000/api/user/token-refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: Cookies.get("refreshToken"),
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed refreshing token: ${response.statusText} ${response.status}`
    );
  }
  return response;
}
