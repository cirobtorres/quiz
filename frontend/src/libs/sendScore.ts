import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function sendScore(
  scoreData: ScoreDataProps
): Promise<any> {
  const response = await fetch(configs.urls.SCORE, {
    method: "POST",
    body: JSON.stringify(scoreData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to send score");
  }
  return await response.json();
}
