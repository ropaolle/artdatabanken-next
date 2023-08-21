import NextLink from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { type User } from "@/lib/auth";
import React, { ReactNode } from "react";

const MenuLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <NavigationMenuItem>
    <NextLink href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>{children}</NavigationMenuLink>
    </NextLink>
  </NavigationMenuItem>
);

const LogoutButton = () => (
  <li>
    <form action="/auth/sign-out" method="post">
      <button className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-left text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30">
        Logout
      </button>
    </form>
  </li>
);

export default function UserMenu({ user }: { user: User | null }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div>
              {user && (
                <Image src={user.gravatar} className="rounded-full" alt="" loading="lazy" width={25} height={25} />
              )}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <MenuLink href="/settings">Settings</MenuLink>
              <MenuLink href="/about">About</MenuLink>
              <hr />
              <LogoutButton />
              <hr />
              <MenuLink href="/login">Login</MenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport className="left-auto right-0" />
    </NavigationMenu>
  );
}
