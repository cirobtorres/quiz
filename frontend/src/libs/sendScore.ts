export default async function sendScore(
  url: string,
  score_quiz: number,
  score_user: number,
  total_correct_answers: number,
  total_questions: number
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score_quiz,
      score_user,
      total_questions,
      total_correct_answers,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send score");
  }

  return response.json();
}
