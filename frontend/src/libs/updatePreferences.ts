import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function updatePreferences(
  userData: FormData
): Promise<number> {
  const response = await fetch(
    `${configs.urls.user.PREFERENCES_UPDATE}/${userData.get("id")}`,
    {
      method: "PUT",
      body: userData,
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}
