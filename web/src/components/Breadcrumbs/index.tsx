"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDropRightLine } from "react-icons/ri";

export default function Breadcrums() {
  const fullPathname = usePathname();
  const pathname = fullPathname.split("/");

  pathname[0] = "home";

  return (
    <ul className="flex gap-1 items-center">
      {pathname.map((path: string, index: number) => (
        <li key={index} className="flex items-center">
          {index !== 0 && <RiArrowDropRightLine className="text-3xl" />}
          <Link
            href={
              index === 0 ? "/" : `/${pathname.slice(1, index + 1).join("/")}`
            }
            className="hover:underline"
          >
            {path}
          </Link>
        </li>
      ))}
    </ul>
  );
}
