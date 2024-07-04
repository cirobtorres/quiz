export default async function getScore(scoreId: number | null) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/score/list-scores${
      scoreId ? `/${scoreId}` : null
    }`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}
