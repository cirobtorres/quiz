"use client";

import { useEffect } from "react";

import Error from "@/components/Error";

export default function CreateQuizUserError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error error={error} reset={reset} />;
}
