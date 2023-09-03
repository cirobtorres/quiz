import { configs } from "@/configs";

// export default async function registerUser(
//   username: string,
//   password: string
// ): Promise<encodedToken> {
//   const response = await fetch(configs.urls.user.REGISTER, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!response.ok) {
//     throw new Error(
//       `Failed registerUser: ${response.statusText} ${response.status}`
//     );
//   }
//   return response.json();
// }

export default async function registerUser(
  username: string,
  password: string
): Promise<void> {
  const response = await fetch(configs.urls.user.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed registerUser: ${response.statusText} ${response.status}`
    );
  }
}
