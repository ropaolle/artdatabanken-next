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
import Image from "next/image";
import NextLink from "next/link";
import { ReactNode } from "react";

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

export default function UserMenu({ user }: { user: { id: string; gravatar: string; email: string } | null }) {
  const isAuthenticated = user?.id;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isAuthenticated ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger aria-label="User menu">
              <Image src={user?.gravatar} className="rounded-full" alt="" loading="lazy" width={25} height={25} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                <MenuLink href="/realtime">Realtime updates</MenuLink>
                <MenuLink href="/settings">Settings</MenuLink>
                <MenuLink href="/users">Users</MenuLink>
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
        )}
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport className="left-auto right-0" />
    </NavigationMenu>
  );
}
