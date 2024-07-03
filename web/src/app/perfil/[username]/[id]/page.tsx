"use client";

import { useState } from "react";
import useUser from "../../../../hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import LoginPasswordInput, {
  PasswordRules,
} from "../../../../components/Inputs/PasswordInput";
import { UsernameInputA } from "../../../../components/Inputs/UsernameInputs";
import { EmailInputA } from "../../../../components/Inputs/EmailInputs";
import { isValid } from "../../../../functions";

export default function ProfilePage() {
  const { user, loading, update } = useUser();
  const router = useRouter();

  if (!user && !loading) {
    router.push("/");
  }

  const [username, setUsername] = useState(user?.getUsername ?? "");
  const [email, setEmail] = useState(user?.getEmail ?? "");
  const [usernameError, setUsernameError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [emailError, setEmailError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      if (isValid(username)) {
        // TODO: code
        return;
      }
      if (email.indexOf("@") === -1) {
        // TODO: code
        return;
      }
      if (image && image.size > 2.0 * 1024 * 1024) {
        // TODO: code
        return;
      }
      if (password1 && isValid(password1)) {
        // TODO: code
        return;
      }

      console.log(image);

      const userData = new FormData();
      userData.append("id", user?.getId.toString() ?? "0");
      userData.append("username", username ? username : "");
      userData.append("password", password1 ? password1 : "");
      userData.append("avatar", image ? image : "");

      if (userData.get("id") === "0")
        throw new Error("Something went wrong...");

      await update(userData);

      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      setUsername(user?.getUsername ?? "");
      setEmail(user?.getEmail ?? "");
      setPassword1("");
      setPassword2("");
    }
  };

  return (
    <div className="w-[80%] p-8 rounded-xl my-8 bg-slate-200">
      <header className="max-w-96 mx-auto flex flex-col items-center mb-4">
        <h1 className="text-7xl font-extrabold text-slate-800">Perfil</h1>
      </header>
      <main className="flex gap-4 mx-auto items-center">
        <div className="w-full flex flex-col justify-center items-center mb-auto">
          <div className="relative size-72 border-8 rounded-full border-dashed border-blue-500">
            <input
              type="file"
              className="absolute inset-0 bg-red-500 cursor-pointer rounded-full opacity-0"
              onChange={handleOnChange}
            />
            {user?.getAvatar && !image ? (
              <Image
                src={user?.getAvatar}
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            ) : image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            ) : (
              <Image
                src="/images/user/avatar/1281x1281-user-icon.png"
                alt={`Avatar de ${user?.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            )}
          </div>
          <div className="flex items-center h-8">
            {image ? (
              <span className="text-xl text-slate-800">{image.name}</span>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <UsernameInputA
            id="username"
            label="Apelido"
            placeholder="JohnDoe"
            value={username}
            setValue={setUsername}
          />
          <EmailInputA
            id="email"
            label="E-mail"
            placeholder="johndoe@email.com"
            value={email}
            setValue={setEmail}
          />
          <LoginPasswordInput
            id="password1"
            label="Senha"
            placeholder=""
            value={password1}
            setValue={setPassword1}
          />
          <LoginPasswordInput
            id="password2"
            label="Confirmar Senha"
            placeholder=""
            value={password2}
            setValue={setPassword2}
          />
          <PasswordRules password1={password1} password2={password2} />
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
            className="mx-auto w-full font-extrabold h-14 text-lg rounded-xl outline-none text-white bg-blue-700"
            onClick={handleSubmit}
          >
            Salvar
          </motion.button>
        </div>
      </main>
    </div>
  );
}
