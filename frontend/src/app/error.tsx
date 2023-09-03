"use client"; // Error components must be Client Components

import { useEffect } from "react";

import Error from "@/components/Error";

export default function RootError({
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
