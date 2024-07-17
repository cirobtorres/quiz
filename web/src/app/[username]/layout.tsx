"use client";

import AvatarNavBar from "@/components/AvatarNavBar";
import Avatar from "../../components/Avatar";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Search from "@/components/Search";
import Link from "next/link";
import NightThemeSwitcher from "@/components/NightThemeSwitcher";

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
    <div className="w-full flex z-50 py-2 shadow-md border-b border-white dark:border-slate-600 bg-slate-200 dark:bg-slate-800">
      <div className="flex-1 w-full max-w-20 flex justify-center items-center mx-auto">
        <Link href="/" className="flex items-center">
          <h1 className="uppercase font-extrabold text-4xl text-slate-800 dark:text-slate-200">
            Quiz
          </h1>
        </Link>
      </div>
      <Search />
      <div className="flex-1 w-full max-w-[10%] flex items-center justify-between mx-auto">
        <NightThemeSwitcher />
        <Avatar />
      </div>
    </div>
  );
};
