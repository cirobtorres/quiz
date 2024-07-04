import Image from "next/image";
import Link from "next/link";

interface QuizCardProps {
  image?: { src: string; alt: string };
  title: string;
  description?: string;
  link: string;
  options?: {
    theme?: string;
    border?: string;
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
      className="flex flex-col w-full max-w-72 min-w-52 h-[30rem] max-h-[30rem] shadow-darker rounded-xl overflow-hidden cursor-pointer"
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

export function InlineQuiz({
  title,
  description,
  link,
  options,
}: QuizCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-col justify-center items-start size-32 p-3 shadow-darker rounded-full overflow-hidden cursor-pointer"
      style={{
        backgroundColor: options?.theme ?? "#1e293b",
        border: options?.border ?? "",
      }}
    >
      <h2
        className={`${options?.titleAlign} font-extrabold text-xl uppercase`}
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
    </Link>
  );
}
