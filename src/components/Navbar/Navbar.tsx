"use client";

import { useEffect } from "react";
import MainMenu from "./MainMenu";
import LoginMenu from "./LoginMenu";
import { type User } from "@/lib/auth";

export default function Navbar({ user }: { user: User | null }) {
  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown });
    };
    init();
  }, [user]);

  return (
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <MainMenu user={user} />
        <LoginMenu user={user} />
      </div>
    </nav>
  );
}
