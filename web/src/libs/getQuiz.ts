export default async function getQuiz() {
  const response = await fetch("http://127.0.0.1:8000/api/quiz", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`);
  }
  return await response.json();
}
