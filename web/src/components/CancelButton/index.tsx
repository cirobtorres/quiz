import Link from "next/link";

export default function CancelButton({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center flex-1 font-extrabold h-14 text-lg rounded-xl outline-none text-crimson"
    >
      {text}
    </Link>
  );
}
