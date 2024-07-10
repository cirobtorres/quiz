export default function ProgressCircle({
  diameter,
  strokeWidth,
  percentage = 0,
  style,
}: {
  diameter: number;
  strokeWidth: number;
  percentage: number;
  style?: { fontSize: number };
}) {
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circunference = 2 * Math.PI * innerRadius;
  const progressBar = circunference - (circunference * percentage) / 100;
  return (
    <div
      className="relative flex" // justify-center items-center
      style={{ height: `${diameter}px` }}
    >
      <div className="relative">
        <svg
          className="relative -rotate-90"
          style={{ width: `${diameter}px`, height: `${diameter}px` }}
        >
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={`${innerRadius}px`}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={circunference}
            stroke="#e2e8f0"
            className="w-fit h-fit fill-none"
            style={{ strokeDashoffset: 0 }}
          ></circle>
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={`${innerRadius}px`}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={circunference}
            stroke="#fbbf24"
            className="w-fit h-fit fill-none"
            style={{ strokeDashoffset: progressBar }}
          ></circle>
        </svg>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&_h2]:text-xl [&_span]:text-sm [&_span]:font-normal">
          <h2
            className="font-extrabold"
            style={{ fontSize: style?.fontSize ? style.fontSize : 20 }}
          >
            {percentage}
            <span
              style={{
                fontSize: style?.fontSize ? (style.fontSize * 2) / 3 : 14,
              }}
            >
              %
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
