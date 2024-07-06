"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";

export default function Presentation() {
  const { user } = useUser();
  return !user ? (
    <section className="max-w-webpage mx-auto">
      <div className="w-1/2 flex flex-col gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-800">
            Cadastre-se para criar quizes totalmente personalizados e
            compartilhá-los com outras pessoas!
          </h2>
        </div>
        <div>
          <p className="text-xl text-slate-800">
            O quiz é composto por questões que têm quatro alternativas de
            resposta cada, e que devem ser respondidas dentro de um limite
            pré-determinado de tempo.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/entrar"
            className="flex-1 text-xl text-center text-slate-800 p-4 rounded-full bg-slate-200 transition-all hover:bg-slate-300"
          >
            Entrar
          </Link>
          <Link
            href="/criar-conta"
            className="flex-1 text-xl text-center text-slate-100 p-4 rounded-full bg-slate-800"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </section>
  ) : null;
}
