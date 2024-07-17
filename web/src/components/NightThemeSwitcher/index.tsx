"use client";

import { motion, Variants } from "framer-motion";
import { IoMoon, IoSunny } from "react-icons/io5";
import useTheme from "@/hooks/useTheme";

const themeVariants: Variants = {
  light: { opacity: 0, scale: 0 },
  dark: { opacity: 1, scale: 1, rotate: 360 },
};

export default function NightThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = (event: React.MouseEvent) => {
    event.preventDefault();
    setTheme();
  };

  return (
    <label
      onClick={handleToggleTheme}
      className="relative flex justify-center items-center rounded-full size-10 duration-700 bg-white dark:bg-slate-700 cursor-pointer"
    >
      <motion.div
        initial="light"
        animate={theme === "dark" ? "dark" : "light"}
        variants={themeVariants}
        transition={{ duration: 0.6 }}
        className="absolute pointer-events-none"
      >
        <IoMoon className="text-2xl text-emerald-400" />
      </motion.div>
      <motion.div
        initial="light"
        animate={theme === "dark" ? "light" : "dark"}
        variants={themeVariants}
        transition={{ duration: 0.6 }}
        className="absolute pointer-events-none"
      >
        <IoSunny className="text-2xl text-yellow-500" />
      </motion.div>
    </label>
  );
}
