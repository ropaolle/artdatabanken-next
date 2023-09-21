"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import type { User } from "@/types/app.types";
import Image from "next/image";
import NextLink from "next/link";
import { ReactNode, Suspense, use } from "react";

const navigationButton =
  "group flex h-10 w-full items-center justify-start bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";

const MenuLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <NavigationMenuItem>
    <NextLink href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationButton}>{children}</NavigationMenuLink>
    </NextLink>
  </NavigationMenuItem>
);

const LogoutButton = () => (
  <li>
    <form action="/auth/sign-out" method="post">
      <button className={navigationButton}>Logout</button>
    </form>
  </li>
);

export default function UserMenu({ userPromise }: { userPromise: Promise<User | null> }) {
  const Menu = ({ userPromise }: { userPromise: Promise<User | null> }) => {
    const user = userPromise && use(userPromise);

    return user ? (
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <div>
            <Image src={user?.gravatar} className="rounded-full" alt="" loading="lazy" width={25} height={25} />
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            <MenuLink href="/settings">Settings</MenuLink>
            <MenuLink href="/about">About</MenuLink>
            <hr />
            <LogoutButton />
            <hr />
            <div className="px-4 py-2 text-sm">
              Logged in as <span className=" text-lime-700">{user?.email}</span>.
            </div>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    ) : (
      <MenuLink href="/login">Login</MenuLink>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Suspense fallback={<MenuLink href="/login">Login</MenuLink>}>
          <Menu userPromise={userPromise} />
        </Suspense>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport className="left-auto right-0" />
    </NavigationMenu>
  );
}
