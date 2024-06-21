"use client";

import Image from "next/image";
import useTheme from "../../hooks/useTheme";

export default function Body({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: string;
}) {
  const { theme } = useTheme();
  return (
    <body
      className={`${theme} ${fontFamily} my-8 min-h-svh bg-gradient-to-tr from-rose-900 to-indigo-900 dark:from-black dark:to-neutral-800`}
    >
      {children}
    </body>
  );
}
