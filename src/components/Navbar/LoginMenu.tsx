"use client";

import Image from "next/image";
import Link from "next/link";
import { type User } from "@/lib";

type Props = {
  user: User | null;
};

const MenuItem = ({ label, href }: { label: string; href: string }) => (
  <li>
    <Link
      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
      href={href}
      data-te-dropdown-item-ref
    >
      {label}
    </Link>
  </li>
);

const MenuItemDivider = () => (
  <li>
    <hr className="my-2" />
  </li>
);

const LogoutButton = () => (
  <li>
    <form action="/auth/sign-out" method="post">
      <button className="block w-full text-left whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30">
        Logout
      </button>
    </form>
  </li>
);

export default function LoginMenu({ user }: Props) {
  return (
    <div className="relative flex items-center">
      {user ? (
        <div className="relative" data-te-dropdown-ref>
          <Link
            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
            href="#"
            id="dropdownMenuButton"
            role="button"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
          >
            <Image src={user.gravatar} className="rounded-full" alt="" loading="lazy" width={25} height={25} />
          </Link>
          <ul
            className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton"
            data-te-dropdown-menu-ref
          >
            <MenuItem label="Settings" href="settings" />
            <MenuItem label="About" href="about" />
            <MenuItemDivider />
            <LogoutButton />
          </ul>
        </div>
      ) : (
        <Link
          className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="login"
          data-te-nav-link-ref
        >
          Login
        </Link>
      )}
    </div>
  );
}
