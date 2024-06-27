"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Skip({ nextQuestion }: { nextQuestion: () => void }) {
  const [instructions, setInstructions] = useState(false);

  const hoverEnter = () => {
    setInstructions(true);
  };

  const hoverLeave = () => {
    setInstructions(false);
  };

  return (
    <button
      onMouseEnter={hoverEnter}
      onMouseLeave={hoverLeave}
      onClick={nextQuestion}
      className={`
        relative w-12 h-12 flex justify-center items-center gap-3 rounded-full 
        text-indigo-700 bg-white shadow-darker animate-bounce-horizontal
      `}
    >
      {instructions && (
        <>
          <div className="absolute p-3 top-[calc(-100%_-_12px)] left-1/2 -translate-x-1/2 rounded-lg shadow-darker bg-white">
            Próxima
          </div>
        </>
      )}
      <FaArrowRight size={20} />
    </button>
  );
}
