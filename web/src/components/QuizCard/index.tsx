import Image from "next/image";
import Link from "next/link";

interface QuizCardProps {
  image?: { src: string; alt: string };
  title: string;
  description?: string;
}

export default function QuizCard({ image, title, description }: QuizCardProps) {
  return (
    <Link href="quiz">
      <article
        className={`
          w-full max-w-72 min-w-52 h-[30rem] max-h-[30rem] 
          flex flex-col shadow-darker rounded-xl overflow-hidden cursor-pointer 
          transition-all duration-200 hover:-translate-y-1 bg-slate-200 dark:bg-slate-700 
        `}
      >
        {image && (
          <>
            <div className="relative flex-[2_2_0] p-3 bg-slate-500">
              <Image
                src={image.src ?? "/images/quiz/cover/1024x1024-quiz-cover.jpg"}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover"
              ></Image>
            </div>
            <hr className="bg-white dark:border-slate-600" />
          </>
        )}
        <div className="flex-1 p-3">
          <h2 className="text-slate-800 dark:text-slate-200 text-xl font-extrabold">
            {title}
          </h2>
          {description && (
            <p className="text-slate-800 dark:text-slate-400 text-sm">
              {description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
