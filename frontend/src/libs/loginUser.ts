import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function loginUser(userData: {
  username: string;
  password: string;
}): Promise<encodedToken> {
  const response = await fetch(configs.urls.token.ACCESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData }),
  });
  if (!response.ok)
    throw new Error(
      `Failed to fetch data ${response.statusText} ${response.status}`
    );
  return await response.json();
}
