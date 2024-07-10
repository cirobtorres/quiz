export default async function getQuestions(params?: {
  params: { quiz?: number | number[]; size?: number };
}) {
  const response = await fetch("http://127.0.0.1:8000/api/quiz/question", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
  return response.json();
}
