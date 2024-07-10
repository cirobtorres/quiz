"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { postUserImage } from "../../libs/userImage";
import Loading from "../Loading";

export default function AvatarNavBar({
  navItems,
}: {
  navItems: { title: string; href: string }[];
}) {
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [image, setImage] = useState<File | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const saveImage = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (image) {
      await postUserImage(image);
    }
  };

  const handleSignOut = async () => {
    // router.push("/");
    await logout();
  };

  return (
    <div className="w-full max-w-[20%] h-full min-h-screen flex flex-col justify-center items-center mt-20 mb-auto">
      <div className="relative rounded-full size-72 mb-4 overflow-hidden">
        <input
          type="file"
          className="absolute inset-0 cursor-pointer rounded-full opacity-0 z-50"
          onChange={handleOnChange}
        />
        {user && !image ? (
          <div className="relative h-full border-2 border-white bg-white">
            <Image
              src={
                user.getAvatar?.getSecureUrl ??
                "/images/user/avatar/1281x1281-user-icon.png"
              }
              alt={`Avatar de ${user.getUsername}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute object-cover rounded-full pointer-events-none"
            />
          </div>
        ) : image ? (
          <div className="relative h-full border-2 border-white bg-white">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Avatar de ${user?.getUsername}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute object-cover rounded-full pointer-events-none"
            />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
      <nav className="w-full flex-1 flex flex-col gap-1 mb-auto pl-10 z-10">
        {navItems.map((item, index) => {
          return (
            <div key={index} className="relative">
              <div
                className={`absolute right-0 -top-4 after:absolute after:content-[''] after:rounded-br-full after:w-full after:h-full ml-auto mr-0 size-4 ${
                  pathname.endsWith(item.href) ? "after:bg-[#7e22ce]" : null
                }`}
                style={{
                  backgroundColor: pathname.endsWith(item.href)
                    ? "#cbd5e1"
                    : "transparent",
                }}
              />
              <Link
                href={item.href}
                className="block text-white text-xl w-full text-start px-10 py-2 border-r-0 rounded-l-full"
                style={{
                  color: pathname.endsWith(item.href) ? "#1e293b" : "#fff",
                  fontWeight: pathname.endsWith(item.href) ? "900" : "500",
                  backgroundColor: pathname.endsWith(item.href)
                    ? "#cbd5e1"
                    : "#7e22ce",
                }}
              >
                {item.title}
              </Link>
              <div
                className={`absolute right-0 -bottom-4 z-10  after:absolute after:content-[''] after:rounded-tr-full after:w-full after:h-full ml-auto mr-0 size-4 ${
                  pathname.endsWith(item.href) ? "after:bg-[#7e22ce]" : null
                }`}
                style={{
                  backgroundColor: pathname.endsWith(item.href)
                    ? "#cbd5e1"
                    : "transparent",
                }}
              />
            </div>
          );
        })}
        <Link
          href="/"
          onClick={handleSignOut}
          className="text-white text-xl w-full text-start px-10 py-2"
        >
          Sair
        </Link>
      </nav>
    </div>
  );
}
