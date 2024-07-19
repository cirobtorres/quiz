"use client";

import Breadcrums from "@/components/Breadcrumbs";
import { useParams } from "next/navigation";

export default function QuizEditingPage() {
  const params = useParams();
  return (
    <div className="w-full flex flex-col min-h-svh px-1 pb-1 bg-slate-300 dark:bg-slate-700">
      <Breadcrums />
      <div></div>
    </div>
  );
}
