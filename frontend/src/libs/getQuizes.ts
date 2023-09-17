import { configs } from "@/configs";

export default async function getQuizes() {
  const response = await fetch(configs.urls.QUIZ, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return response.json();
}
