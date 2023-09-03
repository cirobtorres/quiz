import { useEffect, useState } from "react";

interface CountdownParams {
  secondsLeft: number;
  start: (seconds: number) => void;
}

export default function useCountdown(onEnd: any): CountdownParams {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft, onEnd]);

  function start(seconds: number): void {
    setSecondsLeft(seconds);
  }

  return { secondsLeft, start };
}
