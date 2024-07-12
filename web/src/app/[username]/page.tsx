import { redirect } from "next/navigation";

export default function UsernamePage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  redirect(`${params.username}/perfil`);
}

// Currently it has no content
