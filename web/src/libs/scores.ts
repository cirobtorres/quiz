import Cookies from "js-cookie";

export async function postScore(score: ScoreProps[]) {
  const response = await fetch("http://127.0.0.1:8000/api/score/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify({ score }),
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
  return await response.json();
}

export async function getScore(scoreId: number | undefined) {
  const response = await fetch(`http://127.0.0.1:8000/api/score/${scoreId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function getScores() {
  const response = await fetch("http://127.0.0.1:8000/api/score", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}
