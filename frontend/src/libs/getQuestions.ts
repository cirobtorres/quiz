import Cookies from "js-cookie";

import { configs } from "@/configs";

export default async function getQuestions(
  preferenceUser: number
): Promise<ResponseProps> {
  const response = await fetch(
    `${configs.urls.user.PREFERENCES}/${preferenceUser}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch data ${response.statusText} ${response.status}`
    );
  return response.json();
}
