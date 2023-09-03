import type { Metadata } from "next";

interface Params {
  params: { username: number };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  if (!params.username)
    return {
      title: "Not Found",
    };
  return {
    title: `Perfil | ${params.username}`,
    description: `Perfil de ${params.username}`,
  };
}

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
