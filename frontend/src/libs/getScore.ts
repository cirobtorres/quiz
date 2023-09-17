import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function getScore(id: number) {
  const response = await fetch(`${configs.urls.SCORE}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get score");
  }

  return await response.json();
}
