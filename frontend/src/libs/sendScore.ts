export default async function sendScore(
  url: string,
  quiz: number,
  quiz_user: number,
  total_correct_answers: number,
  total_questions: number
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quiz,
      quiz_user,
      total_questions,
      total_correct_answers,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send score");
  }

  return response.json();
}
