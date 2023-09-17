import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function getPreferences(
  userId: number
): Promise<ResponseProps> {
  const response = await fetch(`${configs.urls.user.PREFERENCES}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}
