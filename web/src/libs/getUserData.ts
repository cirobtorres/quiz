import Cookies from "js-cookie";

export default async function getUserData({
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
