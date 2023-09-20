"use client";

import { useAppStore } from "@/state";
import Link from "next/link";

export default function Collections() {
  const { user } = useAppStore();

  return (
    <>
      <h1>User</h1>
      <p>Email: {user?.email}</p>
      <h1>Collections</h1>
      <Link href="/images/upload" className="mr-4 text-blue-400">
        Upload image
      </Link>
      <Link href="/species/add" className="mr-4 text-blue-400">
        Add species
      </Link>
      <Link
        href={{
          pathname: "/species/edit/92ae1d87-ed74-4c96-b936-fe897a6a9bf1",
          // query: "data", // the data
        }}
        className="mr-4 text-blue-400"
      >
        Edit species
      </Link>
    </>
  );
}
