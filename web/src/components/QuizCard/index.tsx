import Image from "next/image";
import Link from "next/link";

interface QuizCardProps {
  image?: { src: string; alt: string };
  title: string;
  description: string;
  link: string;
  options?: {
    theme?: string;
    titleColor?: string;
    textColor?: string;
    titleAlign?: string;
    textAlign?: string;
  };
}

export default function Quiz({
  image,
  title,
  description,
  link,
  options,
}: QuizCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-col w-full max-w-96 min-w-52 h-full max-h-60 shadow-darker rounded-xl overflow-hidden cursor-pointer"
    >
      {image && (
        <>
          <div className="relative flex-[2_2_0] p-3 bg-slate-500">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute object-cover"
            ></Image>
          </div>
          <hr />
        </>
      )}
      <div
        className="flex-1 p-3"
        style={{
          backgroundColor: options?.theme ?? "#1e293b",
        }}
      >
        <h2
          className={`${options?.titleAlign} font-extrabold text-xl`}
          style={{
            color: options?.titleColor ?? "#fff",
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`${options?.textAlign} text-sm`}
            style={{
              color: options?.textColor ?? "#fff",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
