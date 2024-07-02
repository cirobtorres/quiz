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
      className={`${theme} ${
        isOpen ? "overflow-y-hidden" : null
      } ${fontFamily} min-h-svh bg-gradient-to-tr from-slate-400 to-slate-200`}
    >
      <Wave />
      <div className="w-full max-w-webpage mx-auto h-full min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </body>
  );
}

const Wave = () => {
  return (
    <div className="relative opacity-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute"
      >
        <path d="M0,288L80,261.3C160,235,320,181,480,186.7C640,192,800,256,960,277.3C1120,299,1280,277,1360,266.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>
  );
};
