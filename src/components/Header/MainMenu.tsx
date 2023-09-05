import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { type User } from "@/lib/auth";
import NextLink from "next/link";
import { ReactNode } from "react";

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
