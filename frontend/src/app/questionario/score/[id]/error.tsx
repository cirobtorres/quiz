"use client";

import { useEffect } from "react";

import Error from "@/components/Error";

export default function ScoreError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error error={error} reset={reset} />;
}
