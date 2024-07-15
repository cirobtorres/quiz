"use client";

import AvatarNavBar from "@/components/AvatarNavBar";
import Avatar from "../../components/Avatar";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Search from "@/components/Search";

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
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [loading, user, router]);

  return (
    <main style={{ backgroundColor: "#7e22ce" }} className="w-full h-full flex">
      <AvatarNavBar navItems={navItems} />
      <div className="w-full h-full flex flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
}

const Header = () => {
  return (
    <div className="w-full flex z-50 py-2 shadow-md border-b border-white bg-slate-200">
      <div className="w-full max-w-20 flex justify-center items-center mx-auto">
        <h1 className="uppercase font-extrabold text-2xl text-slate-800">
          Quiz
        </h1>
      </div>
      <Search />
      <div className="mx-auto">
        <Avatar />
      </div>
    </div>
  );
};
