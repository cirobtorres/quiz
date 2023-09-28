import { configs } from "@/configs";

export default async function getQuestions(
  quizId: number
): Promise<ResponseProps> {
  const response = await fetch(`${configs.urls.QUIZ}/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok)
    throw new Error(
      `Failed to fetch data ${response.statusText} ${response.status}`
    );
  return response.json();
}
