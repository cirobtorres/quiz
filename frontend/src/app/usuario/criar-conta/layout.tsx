import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie uma conta para poder criar e responder quizzes!",
};

export default function CreateQuizUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
