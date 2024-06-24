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
      min-h-svh bg-gradient-to-tr from-slate-400 to-slate-200 
      `}
    >
      <div className="w-full max-w-webpage mx-auto h-full min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </body>
  );
}
