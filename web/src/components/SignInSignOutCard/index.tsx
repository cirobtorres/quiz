"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";
import Loading from "@/components/Loading";
import { UsernameInputB } from "../Inputs/UsernameInputs";
import { EmailInputA, EmailInputB } from "../Inputs/EmailInputs";
import LoginPasswordInput, { PasswordRules } from "../Inputs/PasswordInput";

const radioOuterVariants = {
  unchecked: {
    outlineColor: "#fff",
  },
  checked: {
    outlineColor: "#22c55e",
    transition: {
      duration: 0.18,
      ease: "linear",
    },
  },
};

const radioInnerVariants = {
  unchecked: {
    scale: 0,
    backgroundColor: "#fff",
  },
  checked: {
    scale: 1,
    backgroundColor: "#22c55e",
    transition: {
      duration: 0.18,
      ease: "linear",
    },
  },
};

const Radio = ({
  radioType,
  setRadioType,
}: {
  radioType: "signup" | "signin";
  setRadioType: (radioType: "signup" | "signin") => void;
}) => {
  return (
    <div className="mb-4 flex gap-3">
      <label
        htmlFor="signup"
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setRadioType("signup")}
      >
        <motion.div
          initial="checked"
          animate={`${radioType === "signup" ? "checked" : "unchecked"}`}
          variants={radioOuterVariants}
          className="relative size-[0.85rem] rounded-full outline outline-1 outline-offset-2 bg-white"
        >
          <input
            type="radio"
            name="action_type"
            id="signup"
            value="signup"
            defaultChecked
            hidden
          />
          <motion.div
            initial="checked"
            animate={`${radioType === "signup" ? "checked" : "unchecked"}`}
            variants={radioInnerVariants}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
        <span>Cadastrar</span>
      </label>
      <label
        htmlFor="signin"
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setRadioType("signin")}
      >
        <motion.div
          initial="checked"
          animate={`${radioType === "signin" ? "checked" : "unchecked"}`}
          variants={radioOuterVariants}
          className="relative size-[0.85rem] rounded-full outline outline-1 outline-offset-2 bg-white"
        >
          <input
            type="radio"
            name="action_type"
            id="signin"
            value="signin"
            hidden
          />
          <motion.div
            initial="unchecked"
            animate={`${radioType === "signin" ? "checked" : "unchecked"}`}
            variants={radioInnerVariants}
            transition={{ ease: "circInOut" }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
        <span>Fazer login</span>
      </label>
    </div>
  );
};

const SubmitSignInSignOut = () => {
  return (
    <motion.button
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        bounce: 0.5,
        duration: 0.5,
      }}
      className="ml-auto flex justify-center items-center w-1/2 px-8 font-extrabold h-12 text-lg rounded-xl outline-none text-white bg-blue-700"
      onClick={() => console.log("Confirmar")}
    >
      Confirmar
    </motion.button>
  );
};

const RegisterLoginCard = () => {
  const { user, loading } = useUser();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [email, setEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpUsernameError, setSignUpUsernameError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [emailError, setEmailError] = useState<{
    message: string;
    type: string;
    status: number;
  } | null>(null);
  const [radioType, setRadioType] = useState<"signup" | "signin">("signup");
  return (
    <div className="w-[30rem] rounded-2xl p-4 bg-slate-200 shadow-xl z-50">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : !user ? (
        <>
          <Radio radioType={radioType} setRadioType={setRadioType} />
          {radioType === "signup" ? (
            <>
              <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                Criar Conta
              </h2>
              <form className="w-full">
                <div className="flex flex-col gap-2">
                  <UsernameInputB
                    id="signUpUsername"
                    label="Apelido"
                    placeholder="johndoe"
                    value={signUpUsername}
                    setValue={setSignUpUsername}
                    error={signUpUsernameError}
                    setError={setSignUpUsernameError}
                  />
                  <EmailInputB
                    id="email"
                    label="E-mail"
                    placeholder="johndoe@email.com"
                    value={email}
                    setValue={setEmail}
                    error={emailError}
                    setError={setEmailError}
                  />
                  <LoginPasswordInput
                    id="signUpPassword"
                    label="Senha"
                    placeholder=""
                    value={signUpPassword}
                    setValue={setSignUpPassword}
                  />
                  <LoginPasswordInput
                    id="confirmPassword"
                    label="Confirmar Senha"
                    placeholder=""
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                  />
                </div>
                <PasswordRules
                  password1={signUpPassword}
                  password2={confirmPassword}
                />
                <SubmitSignInSignOut />
              </form>
            </>
          ) : (
            <>
              <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
                Fazer Login
              </h2>
              <form className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <EmailInputA
                    id="signInUsername"
                    label="E-mail"
                    placeholder="johndoe@email.com"
                    value={signInEmail}
                    setValue={setSignInEmail}
                  />
                  <LoginPasswordInput
                    id="signInPassword"
                    label="Confirmar Senha"
                    placeholder=""
                    value={signInPassword}
                    setValue={setSignInPassword}
                  />
                </div>
                <SubmitSignInSignOut />
              </form>
            </>
          )}
        </>
      ) : (
        <h2 className="text-gray-800 text-4xl font-extrabold py-2 mb-4">
          {user.getUsername}
        </h2>
      )}
    </div>
  );
};
