export default async function getScore(url: string, id: number) {
  const response = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get score");
  }

  return await response.json();
}
