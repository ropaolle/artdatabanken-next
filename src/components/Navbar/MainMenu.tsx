"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import { type User } from "@/lib";

const MENU_ID = "leftNavigationMenu";

export default function MainMenu(/* { user }: { user: User | null } */) {
  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown });
    };
    init();
  }, []);

  const MenuLink = ({ label, href }: { label: string; href: string }) => (
    <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
      <Link
        className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
        href={href}
        data-te-nav-link-ref
      >
        {label}
      </Link>
    </li>
  );

  const HamburgerButton = () => (
    <button
      className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      data-te-collapse-init
      data-te-target={`#${MENU_ID}`}
      aria-controls={MENU_ID}
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="[&>svg]:w-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );

  const LogoAndBrand = ({ logo, brand }: { logo: string; brand?: string }) => (
    <Link
      className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
      href="/"
    >
      <Image src={logo} alt="TE Logo" loading="lazy" width={25} height={25} />
      {brand && <span className=" font-bold text-neutral-600 dark:text-neutral-200 ml-2">{brand}</span>}
    </Link>
  );

  const CollapsibleNavigationContainer = () => (
    <div
      className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
      id={MENU_ID}
      data-te-collapse-item
    >
      <LogoAndBrand logo="/bird.svg" brand="Artdatabanken" />
      <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
        <MenuLink label="Species" href="species" />
        <MenuLink label="Images" href="images" />
        <MenuLink label="Collections" href="collections" />
      </ul>
    </div>
  );

  return (
    <>
      <HamburgerButton />
      <CollapsibleNavigationContainer />
    </>
  );
}
