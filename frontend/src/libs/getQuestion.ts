export default async function getQuestion(
  url: string,
  id: number
): Promise<QuestionModel> {
  const response = await fetch(`${url}/${id}`, {
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
