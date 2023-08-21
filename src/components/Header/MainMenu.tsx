// "use client";

// import { useEffect } from "react";
// import Image from "next/image";
import NextLink from "next/link";
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

export default function MainMenu({ user }: { user: User | null }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {user && (
          <>
            <MenuLink href="/species">Species</MenuLink>
            <MenuLink href="/images">Images</MenuLink>
            <MenuLink href="/collections">Collections</MenuLink>
          </>
        )}
        {!user && <MenuLink href="/examples">Examples</MenuLink>}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
