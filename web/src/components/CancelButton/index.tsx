export default function CancelButton({ text }: { text: string }) {
  return (
    <button className="flex-1 font-extrabold h-14 text-lg rounded-xl outline-none text-crimson">
      {text}
    </button>
  );
}
