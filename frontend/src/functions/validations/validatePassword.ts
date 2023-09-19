export default function validatePassword(
  password: string,
  confirmPassword: string
): { error: boolean; arrayError: string[] } {
  let error: boolean = false;
  const arrayError: string[] = [];
  if (password !== confirmPassword) {
    arrayError.push("Senhas não conferem");
    error = true;
  }
  if (password.length < 6) {
    arrayError.push("Senha deve ter mais que 6 caracteres");
    error = true;
  }
  if (password.match(/[^a-zA-Z0-9]/g)) {
    arrayError.push("Senha deve conter apenas letras e números");
    error = true;
  }
  return { error, arrayError };
}
