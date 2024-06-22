"use client";

import ConfirmButton from "@/components/ConfirmButton";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-1/4 mx-auto h-full min-h-screen flex flex-col justify-center items-fenter gap-3">
      <header>
        <h1 className="text-white text-2xl font-extrabold">Criar Conta</h1>
      </header>
      <main className="flex flex-col justify-center items-fenter gap-3">
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
        <button className="text-crimson">Voltar</button>
        <ConfirmButton text="Criar" />
        <span className="text-white flex gap-1 justify-center">
          Fazer
          <button className="text-blue-500 font-bold underline">login</button>
        </span>
      </main>
    </div>
  );
}

const Input = ({
  id,
  label,
  value,
  setValue,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) => {
  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div className={`flex h-full w-full flex-col`}>
      <div className={"relative"}>
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          className={`
            peer w-full rounded-xl p-4 text-theme-04 
            outline-none focus:ring-0 focus:placeholder:text-theme-08 
            placeholder:text-transparent active:placeholder:text-theme-08
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute start-3 top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform 
            pointer-events-none px-2 text-lg duration-300 ${
              value ? "text-amber-500" : "text-black"
            }
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-amber-500
            peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] 
            peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};
