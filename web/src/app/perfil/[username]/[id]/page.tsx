"use client";

import { useState } from "react";
import Input from "../../../../components/Inputs/LoginInput";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <header className="max-w-96 mx-auto flex flex-col items-center">
        <h1>Perfil</h1>
      </header>
      <main className="max-w-96 mx-auto flex flex-col items-center">
        <Input
          id="username"
          label="Apelido"
          value={username}
          setValue={setUsername}
          placeholder="JohnDoe"
        />
        <Input
          id="password"
          label="Senha"
          value={password}
          setValue={setPassword}
          placeholder=""
        />
      </main>
    </>
  );
}
