export default async function getScoreData(
  url: string
): Promise<QuizUserPaginated> {
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  return await response.json();
}
