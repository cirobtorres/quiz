import Cookies from "js-cookie";

import { configs } from "@/configs";

export async function updateUser(userData: FormData): Promise<encodedToken> {
  const response: Response = await fetch(
    `${configs.urls.user.UPDATE}/${userData.get("id")}`,
    {
      method: "PUT",
      body: userData,
      headers: {
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}
