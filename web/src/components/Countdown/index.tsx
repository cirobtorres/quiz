import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface CountdownProps {
  duration: number;
  whenFinish: () => void;
}

export default function Countdown(props: CountdownProps) {
  const [start, middle, end] = [
    props.duration,
    props.duration / 2,
    props.duration / 4,
  ];

  const size = 140;

  return (
    <div className={`w-[${size}px] h-[${size}px]`}>
      <CountdownCircleTimer
        duration={props.duration}
        size={140}
        strokeWidth={12}
        isPlaying
        onComplete={() => props.whenFinish()}
        colors={["#bce596", "#f7b801", "#ed827a", "#fc4747"]}
        colorsTime={[start, middle, end, 0]}
      >
        {({ remainingTime }) => (
          <span className="text-white text-6xl font-extrabold">
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
