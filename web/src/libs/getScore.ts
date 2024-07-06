import Cookies from "js-cookie";

export default async function getScore(scoreId: number | undefined) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/score/${scoreId ? scoreId : null}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}
