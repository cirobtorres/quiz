import Avatar from "@/components/Avatar";
import QuizCard from "@/components/QuizCard";

const user = {
  src: "/images/user/avatar/user-avatar.jpg",
  userId: 1,
  username: "johndoe",
};

export default function HomePage() {
  return (
    <main className="w-3/4 mx-auto">
      <div className="relative py-8">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-50">
          <Avatar user={user} />
        </div>
        <h1 className="text-white text-7xl text-center font-extrabold">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </h1>
      </div>
      <div className="flex gap-2">
        <QuizCard
          src="/images/quiz/geography-scaled-2048x1366.jpeg"
          alt="Globo da Terra"
          theme="#3f6212"
          title="Geografia do Brasil"
          description="Descrição de Quiz Name 1"
        />
        <QuizCard
          src="/images/quiz/history-scaled-1600x800.jpg"
          alt="Mapa de navegação antigo e bússola"
          theme="#92400e"
          title="História do Brasil"
          description="Descrição de Quiz Name 2"
        />
        <QuizCard
          src="/images/quiz/ciencia-1183x887.png"
          alt="Âtomo conceitual"
          theme="#155e75"
          title="Ciência e Tecnologia"
          description="Descrição de Quiz Name 3"
        />
      </div>
    </main>
  );
}
