export default function Response({
  text,
  option,
  color,
}: {
  text: any;
  option: any;
  color: any;
}) {
  return (
    <div
      className="w-1/2 flex flex-col gap-2 mx-auto cursor-pointer perspective-1000 shadow-darker"
      onClick={() => console.log("click")}
    >
      <div className="w-full overflow-hidden relative flex flex-col flex-1 transition duration-700 transform-style-3d">
        <div
          className="flex gap-3 items-center p-3 rounded-xl border-4 bg-white"
          style={{ borderColor: color }}
        >
          <div className="font-extrabold after:content-[')']">{option}</div>
          <div className="w-full truncate">{text}</div>
        </div>
      </div>
    </div>
  );
}
