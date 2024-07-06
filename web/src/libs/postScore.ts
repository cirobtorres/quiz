import Cookies from "js-cookie";

export default async function postScore(score: ScoreProps[]) {
  const response = await fetch("http://127.0.0.1:8000/api/score/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify({ score }),
  });
  if (!response.ok) {
    throw response.statusText;
  }
  return await response.json();
}
