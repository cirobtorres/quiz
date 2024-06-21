"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGear, FaCircleUser } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

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
          // className="flex flex-col items-center"
          className="relative flex items-center"
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
                className="absolute object-cover"
              />
            </button>
          </div>
          <motion.div
            variants={listVariants}
            style={{
              pointerEvents: isOpen ? "auto" : "none",
              shadow: isOpen ? "0 10px 20px 0 rgba(0, 0, 0, 0.5)" : "none",
            }}
            layout
            className="absolute top-full left-1/2 -translate-x-1/2"
          >
            <motion.ul className="w-40 flex flex-col gap-3 p-3 text-slate-200 bg-gradient-to-tr from-rose-900 via-pink-900 to-rose-950">
              <motion.li variants={itemVariants}>
                <Link href="/">Configurar Quiz</Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link href="/">Pontuação</Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link href="/" className="w-fit flex gap-2 group">
                  Perfil{" "}
                  <div className="w-6 h-6 relative">
                    <FaGear
                      size={16}
                      className="absolute bottom-0 left-0 group-hover:animate-spin-slow-clockwise"
                    />
                    <FaGear
                      size={13}
                      className="absolute top-0 right-0 group-hover:animate-spin-slow-counterclockwise"
                    />
                  </div>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <button type="button" onClick={() => console.log("Sair")}>
                  Sair
                </button>
              </motion.li>
            </motion.ul>
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
