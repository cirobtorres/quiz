import Image from "next/image";

export default function Quiz({
  src,
  alt,
  theme,
  title,
  description,
}: {
  src: string;
  alt: string;
  theme: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-full max-w-96 h-52 shadow-darker rounded-lg overflow-hidden">
      <div className="relative flex-[2_2_0] p-3 bg-slate-500">
        <Image
          src={src}
          alt={alt}
          fill
          className="absolute object-cover"
        ></Image>
      </div>
      <hr />
      <div className="flex-1 p-3" style={{ backgroundColor: theme }}>
        <h2 className="text-xl text-slate-200">{title}</h2>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>
    </div>
  );
}
