"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { IoExitOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import { User } from "@/models/User";

const listVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const userAvatarSize = 3.5; // rem
  const { user } = useUser();
  return (
    <div className="h-full flex flex-row items-center">
      {user ? (
        <SignedInAvatar
          userAvatarSize={userAvatarSize}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
        />
      ) : (
        <SignedOutAvatar
          userAvatarSize={userAvatarSize}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

const SignedInAvatar = ({
  userAvatarSize,
  isOpen,
  setIsOpen,
  user,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User;
}) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative flex items-center shadow-darker rounded-full"
    >
      <div
        className={`rounded-full ${
          user.getAvatar
            ? "bg-gradient-to-tr from-pink-500 to-yellow-500"
            : "bg-white"
        } p-[2px]`}
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
            src={
              user.getAvatar ?? "/images/user/avatar/1281x1281-user-icon.png"
            }
            alt="Imagem to usuário"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute object-cover"
          />
        </button>
      </div>
      <SignedInAvatarBox
        userAvatarSize={userAvatarSize}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
      />
    </motion.div>
  );
};

const SignedOutAvatar = ({
  userAvatarSize,
  isOpen,
  setIsOpen,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative flex items-center shadow-darker rounded-full"
    >
      <div
        className="rounded-full p-[2px] bg-white"
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
};

const SignedInAvatarBox = ({
  userAvatarSize,
  isOpen,
  setIsOpen,
  user,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User;
}) => {
  const { logout } = useUser();
  const signedInAvatarBoxWidth = 24; // rem
  const calcLeftDeslocation = signedInAvatarBoxWidth / 2 - userAvatarSize / 2;

  const left = `-${calcLeftDeslocation}rem`;
  const width = `${signedInAvatarBoxWidth}rem`;

  const handleLogout = () => {
    if (logout) {
      logout();
      setIsOpen(false);
    }
  };

  return (
    <motion.div
      variants={listVariants}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        width: width,
        left: left,
      }}
      layout
      className="w-96 absolute top-[140%] rounded-3xl bg-gradient-to-bl from-gray-200 to-gray-300"
    >
      <motion.div variants={itemVariants} className="flex p-2">
        <span className="flex-1 ml-10 text-center">{user.getEmail}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <IoIosClose strokeWidth={20} size={25} />
        </button>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex justify-center bg-gradient-to-tr from-pink-500 to-yellow-500 p-[2px]"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-28 h-28 relative overflow-hidden transition ease-in duration-300 group"
        >
          <Image
            src={
              user.getAvatar ?? "/images/user/avatar/1281x1281-user-icon.png"
            }
            alt="Imagem to usuário"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute object-cover group-hover:opacity-50 transition ease-in duration-300"
          />
          <FaCamera
            className={`
                  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-transparent 
                  group-hover:opacity-75 group-hover:text-white group-hover:text-opacity-75 transition ease-in duration-300 text-3xl
                `}
          />
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center my-2">
        <h3 className="text-xl">
          Olá, <strong>{user.getUsername}!</strong>
        </h3>
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center">
        <Link
          href="/"
          className="bg-blue-500 text-white rounded-full w-fit px-4 py-3"
        >
          Pontuação
        </Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-3/4 flex mx-auto gap-1 m-4"
      >
        <Link
          href="/"
          className="w-full flex-1 flex justify-center gap-2 p-4 rounded-l-full bg-gray-200 hover:bg-gray-100" // group
        >
          Perfil{" "}
          <div className="w-6 h-6 relative">
            <FaGear
              size={16}
              className="absolute bottom-0 left-0 animate-spin-slow-clockwise" // group-hover:animate-spin-slow-clockwise
            />
            <FaGear
              size={13}
              className="absolute top-0 right-0 animate-spin-slow-counterclockwise" // group-hover:animate-spin-slow-counterclockwise
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex-1 flex items-center gap-2 text-center p-4 rounded-r-full bg-gray-200 hover:bg-gray-100"
        >
          <IoExitOutline size={25} /> Sair
        </button>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-3/4 mx-auto flex gap-1 pb-4 text-xs"
      >
        <button className="flex-1 p-1 text-right hover:bg-white">
          Política de privacidade
        </button>
        <button className="flex-1 p-1 text-left hover:bg-white">
          Termos de serviço
        </button>
      </motion.div>
    </motion.div>
  );
};

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
      <Link href="/entrar">
        <motion.div
          variants={itemVariants}
          className="w-full px-2 py-1 rounded-xl hover:bg-slate-100"
        >
          Entrar
        </motion.div>
      </Link>
      <Link href="/criar-conta">
        <motion.div
          variants={itemVariants}
          className="w-full px-2 py-1 rounded-xl hover:bg-slate-100"
        >
          Cadastrar
        </motion.div>
      </Link>
    </motion.div>
  );
};
