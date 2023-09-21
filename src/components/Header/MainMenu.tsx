"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { User } from "@/types/app.types";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense, use } from "react";

const MenuLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuItem>
      <NextLink href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={isActive}>
          {children}
        </NavigationMenuLink>
      </NextLink>
    </NavigationMenuItem>
  );
};

const MenuItems = ({ userPromise }: { userPromise: Promise<User | null> }) =>
  use(userPromise) ? (
    <>
      <MenuLink href="/species">Species</MenuLink>
      <MenuLink href="/images">Images</MenuLink>
      <MenuLink href="/collections">Collections</MenuLink>
    </>
  ) : (
    <MenuLink href="/examples">Examples</MenuLink>
  );

export default function MainMenu({ userPromise }: { userPromise: Promise<User | null> }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Suspense fallback={<MenuLink href="/examples">Examples</MenuLink>}>
          <MenuItems userPromise={userPromise} />
        </Suspense>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
