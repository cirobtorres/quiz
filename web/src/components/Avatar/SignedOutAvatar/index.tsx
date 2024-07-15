import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { EmailInputA } from "../../Inputs/EmailInputs";
import PasswordInput from "../../Inputs/PasswordInput";
import { listVariants, itemVariants } from "../avatarVariants";

export default function SignedOutAvatar({
  userAvatarSize,
  isOpen,
  setIsOpen,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative flex items-center shadow-xl rounded-full"
    >
      <div
        className="rounded-full text-white bg-black" // p-[2px]
        style={{
          width: `${userAvatarSize}rem`,
          height: `${userAvatarSize}rem`,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full w-full h-full bg-white overflow-hidden"
        >
          <Image
            src="/images/user/avatar/1281x1281-user-icon.png"
            alt="Imagem to usuário"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute object-cover"
          />
        </button>
      </div>
      <SignedOutAvatarBox
        userAvatarSize={userAvatarSize}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </motion.div>
  );
}

const SignedOutAvatarBox = ({
  userAvatarSize,
  isOpen,
  setIsOpen,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const signedOutAvatarBoxWidth = 14; // rem
  const calcLeftDeslocation = signedOutAvatarBoxWidth / 2 - userAvatarSize / 2;

  const left = `-${calcLeftDeslocation}rem`;
  const width = `${signedOutAvatarBoxWidth}rem`;

  return (
    <motion.div
      variants={listVariants}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        width: width,
        left: left,
      }}
      layout
      className="absolute top-[140%] rounded-3xl p-4 bg-slate-200"
    >
      <motion.button
        variants={itemVariants}
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-4"
      >
        <IoIosClose strokeWidth={20} size={25} />
      </motion.button>
      <motion.div
        variants={itemVariants}
        className="w-full px-2 py-1 rounded-xl hover:bg-slate-100"
      >
        <Link href="/entrar" className="block w-full">
          Entrar
        </Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-full px-2 py-1 rounded-xl hover:bg-slate-100"
      >
        <Link href="/criar-conta" className="block w-full">
          Cadastrar
        </Link>
      </motion.div>
    </motion.div>
  );
};
