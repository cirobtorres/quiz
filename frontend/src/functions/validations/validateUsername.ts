import { configs } from "@/configs";

export default async function validateUsername(username: string): Promise<{
  error: boolean;
  arrayError: string[];
}> {
  let error: boolean = false;
  const arrayError: string[] = [];
  const usernameAPI = await validateUsernameAPI(username);
  if (usernameAPI) {
    return {
      error: true,
      arrayError: ["Usuário já cadastrado"],
    };
  }
  if (username.length < 4 || username.length > 32) {
    arrayError.push("Usuário deve ter entre 4 e 32 caracteres");
    error = true;
  }
  if (username.match(/[^a-zA-Z_]/g)) {
    arrayError.push("Usuário deve conter apenas letras");
    error = true;
  }
  return { error, arrayError };
}

async function validateUsernameAPI(username: string): Promise<boolean> {
  const response = await fetch(
    `${configs.urls.user.RETRIEVE_USERNAME}/${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }
  );
  if (!response.ok)
    throw new Error(`${response.status} (${response.statusText})`);
  return await response.json();
}
