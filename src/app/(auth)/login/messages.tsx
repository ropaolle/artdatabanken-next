"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && <p className="mt-4 bg-red-500 p-4 text-center text-neutral-200">{error}</p>}
      {message && <p className="mt-4 bg-sky-500 p-4 text-center text-neutral-200">{message}</p>}
    </>
  );
}
