"use client";

import useTheme from "../../hooks/useTheme";
import useModal from "@/hooks/useModal";

export default function Body({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: string;
}) {
  const { theme } = useTheme();
  const { isOpen } = useModal();
  return (
    <body
      className={`${theme} ${isOpen ? "overflow-y-hidden" : null} ${fontFamily} 
      scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-sky-700 scrollbar-track-sky-300
      min-h-svh bg-gradient-to-tr from-rose-900 to-indigo-900 dark:from-black dark:to-neutral-800
      `} // [background-image:url("/images/designs/main-background-1011x666.jpg")]
    >
      {children}
    </body>
  );
}
