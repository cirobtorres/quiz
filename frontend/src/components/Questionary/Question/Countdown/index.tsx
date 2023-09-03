import { useEffect, useState } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./Countdown.module.css";

interface CountdownProps {
  duration: number;
  nextStep: () => void;
}

export default function Countdown(props: CountdownProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [start, middle, end] = [
    props.duration,
    props.duration / 2,
    props.duration / 4,
  ];

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const size = width > 768 ? 180 : 90;
  const strokeWidth = width > 768 ? 12 : 9;

  return (
    <div className={styles.countdownContainer}>
      <CountdownCircleTimer
        duration={props.duration}
        size={size}
        strokeWidth={strokeWidth}
        isPlaying
        onComplete={props.nextStep}
        colors={["#bce596", "#f7b801", "#ed827a", "#fc4747"]}
        colorsTime={[start, middle, end, 0]}
      >
        {({ remainingTime }) => (
          <div className={styles.countdownText}>
            {size > 90 && <span>Cronômetro</span>}
            <span className={styles.remainingTime}>{remainingTime}</span>
            {size > 90 && <span>segundos</span>}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
