"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGear, FaCircleUser } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { IoExitOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

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

export default function Avatar({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-full flex flex-row items-center">
      {user ? (
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="relative flex items-center shadow-darker rounded-full"
        >
          <div className="rounded-full w-14 h-14 bg-gradient-to-tr from-pink-500 to-yellow-500 p-[2px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative rounded-full overflow-hidden w-full h-full bg-white"
            >
              <Image
                src={user.src}
                alt="Imagem to usuário"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover"
              />
            </button>
          </div>
          <motion.div
            variants={listVariants}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
            layout
            className="w-96 absolute top-[140%] -left-40 rounded-3xl bg-slate-200"
          >
            <motion.div variants={itemVariants} className="flex p-2">
              <span className="flex-1 ml-10 text-center">{user.email}</span>
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
                  src={user.src}
                  alt="Imagem to usuário"
                  fill
                  className="absolute object-cover group-hover:opacity-50 transition ease-in duration-300"
                />
                <FaCamera
                  className={`
                  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-transparent 
                  group-hover:opacity-75 group-hover:text-white transition ease-in duration-500 text-xl
                `}
                />
              </button>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center my-2">
              <h3 className="text-xl">
                Olá, <strong>{user.username}!</strong>
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
                className="w-full flex-1 flex justify-center gap-2 p-4 rounded-l-full bg-white hover:bg-slate-100" // group
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
                onClick={() => console.log("Sair")}
                className="w-full flex-1 flex items-center gap-2 text-center p-4 rounded-r-full bg-white hover:bg-slate-100"
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
        </motion.div>
      ) : (
        <Link
          href="/"
          className="rounded-full flex justify-center items-center w-14 h-14 border-2 border-white bg-white overflow-hidden"
        >
          <FaCircleUser size={56} />
        </Link>
      )}
    </div>
  );
}
