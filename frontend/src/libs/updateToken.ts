import Cookies from "js-cookie";

import { configs } from "@/configs";

export async function updateToken(): Promise<Response> {
  const response: Response = await fetch(configs.urls.token.REFRESH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: Cookies.get("refreshToken"),
    }),
  });
  return response;
}
