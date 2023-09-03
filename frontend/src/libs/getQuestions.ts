export default async function getQuestions(
  url: string
): Promise<QuestionModel[]> {
  const response = await fetch(url, {
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
