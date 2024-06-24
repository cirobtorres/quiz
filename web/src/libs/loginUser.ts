export default async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/user/token-access", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(`Failed signIn: ${response.statusText} ${response.status}`);
  }
  return await response.json();
}
