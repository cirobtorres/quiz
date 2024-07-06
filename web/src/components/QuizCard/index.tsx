import Image from "next/image";
import Link from "next/link";

interface QuizCardProps {
  image?: { src: string; alt: string };
  title: string;
  description?: string;
  theme: string;
}

export default function QuizCard({
  image,
  title,
  description,
  theme,
}: QuizCardProps) {
  return (
    <Link href="quiz">
      <article className="flex flex-col w-full max-w-72 min-w-52 h-[30rem] max-h-[30rem] shadow-darker rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1">
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
            backgroundColor: theme ?? "#1e293b",
          }}
        >
          <h2 className="text-slate-100 font-extrabold text-xl">{title}</h2>
          {description && (
            <p className="text-slate-100 text-sm">{description}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
