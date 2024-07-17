// import { SiLootcrate } from "react-icons/si";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        quiz: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(121,9,96,1) 35%, rgba(0,212,255,1) 100%)",
      },
      textColor: {
        crimson: "var(--crimson)",
      },
      boxShadow: {
        darker: "0 10px 20px 0 rgba(0, 0, 0, 0.5)",
        "darker-bottom": "0 10px 20px 0 rgba(0, 0, 0, 0.5)",
      },
      maxWidth: {
        // QuizCard max width = 24rem
        // QuizCard flex gap between each card = 1rem
        // 24rem * 3 (cards) + 1rem * 2 (gaps) = 74rem
        webpage: "74rem",
      },
      animation: {
        loading: "rotate 2s linear infinite",
        "loading-dashes": "dash 1.5s ease-in-out infinite",
        "loading-dots": "ellipsis steps(5, end) 900ms infinite",
        "bounce-horizontal": "bounce-horizontal 1s infinite",
        "spin-slow-clockwise": "rotate-slow-clockwise 2s linear infinite",
        "spin-slow-counterclockwise":
          "rotate-slow-counterclockwise 2s linear infinite",
      },
      keyframes: {
        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        dash: {
          "0%": {
            "stroke-dasharray": "1, 200",
            "stroke-dashoffset": "0",
            stroke: "#ffa700",
          },
          "50%": {
            "stroke-dasharray": "89, 200",
            "stroke-dashoffset": "-35px",
            stroke: "#ffa700",
          },
          "100%": {
            "stroke-dasharray": "89, 200",
            "stroke-dashoffset": "-124px",
            stroke: "#ffa700",
          },
        },
        ellipsis: {
          to: {
            width: "1.25em",
          },
        },
        "bounce-horizontal": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "rotate-slow-clockwise": {
          to: {
            transform: "rotate(360deg)",
          },
        },
        "rotate-slow-counterclockwise": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
