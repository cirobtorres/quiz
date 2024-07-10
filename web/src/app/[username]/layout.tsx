import AvatarNavBar from "@/components/AvatarNavBar";
import Header from "@/components/Header";

const navItems = [
  {
    title: "Perfil",
    href: "perfil",
  },
  {
    title: "Painel de Quiz",
    href: "painel-de-quiz",
  },
  {
    title: "Pontuação",
    href: "pontuacao",
  },
  {
    title: "Mensagens",
    href: "mensagens",
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userTheme = "#7e22ce";

  return (
    <main style={{ backgroundColor: userTheme }} className="w-full h-full flex">
      <AvatarNavBar navItems={navItems} />
      <div className="w-full h-full flex flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
}
