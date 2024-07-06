"use client";

import { usePathname } from "next/navigation";
import useTheme from "../../hooks/useTheme";

export default function Body({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: string;
}) {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <body
      className={`${theme} ${fontFamily} min-h-svh bg-gradient-to-tr from-slate-400 to-slate-200`}
    >
      <UpperWave />
      <div className="w-full mx-auto h-full min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
      {pathname === "/" ? <Footer /> : null}
    </body>
  );
}

const UpperWave = () => {
  return (
    <div className="relative -z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute"
      >
        <path
          fill="#94a3b8"
          d="M0,288L80,261.3C160,235,320,181,480,186.7C640,192,800,256,960,277.3C1120,299,1280,277,1360,266.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <BottomWave />
      <div className="h-40 bg-slate-400"></div>
      <div className="h-20 flex justify-center items-center border-t border-slate-300 bg-slate-800">
        <span className="text-xs text-slate-300">
          Powered by Django & NextJS
        </span>
      </div>
    </footer>
  );
};

const BottomWave = () => {
  return (
    <div className="relative -z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -bottom-[1px]"
      >
        <path
          fill="#94a3b8"
          d="M0,288L48,256C96,224,192,160,288,144C384,128,480,160,576,176C672,192,768,192,864,170.7C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};
