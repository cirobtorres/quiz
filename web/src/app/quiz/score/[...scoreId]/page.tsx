export default function ScorePage() {
  return (
    <main className="fixed w-full h-full flex justify-center pb-40 items-center bg-quiz">
      <div className="grid grid-cols-3 gap-4">
        <ScoreCircle
          text="Questões"
          value={15}
          options={{ textColor: "#172554", circleColor: "#3b82f6" }}
        />
        <ScoreCircle
          text="Corretas"
          value={11}
          options={{ textColor: "#3b0764", circleColor: "#a855f7" }}
        />
        <ScoreCircle
          text="Score Total"
          value={Math.round((11 / 15) * 100)}
          options={{ textColor: "#500724", circleColor: "#ec4899" }}
        />
      </div>
    </main>
  );
}

const ScoreCircle = ({
  text,
  value,
  options,
}: {
  value: number;
  text: string;
  options?: { textColor: string; circleColor: string };
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-slate-900 text-5xl font-extrabold">{text}</h2>
      <div
        className="flex flex-col justify-center items-center size-80 rounded-full bg-blue-500"
        style={{ backgroundColor: options?.circleColor }}
      >
        <span
          className="text-blue-950 text-7xl font-extrabold"
          style={{ color: options?.textColor }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};
