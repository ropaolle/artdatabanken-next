import { fetchServerUser } from "@/supabase/fetchUser/fetchServerUser";
import {
  Mail as Email,
  Facebook,
  Github,
  Home,
  Instagram,
  Linkedin,
  Lock,
  Phone,
  Box as Qube,
  Twitter,
  Globe as Web,
} from "lucide-react";
import Link from "next/link";
import { cn } from "./ui/utils";

export default async function Footer() {
  const { isAuthenticated } = await fetchServerUser();

  const SocialLink = ({ href, icon }: { href: string; icon: JSX.Element }) => (
    <Link href={href} target="_blank" className="mr-6 text-neutral-600 dark:text-neutral-200">
      {icon}
    </Link>
  );

  const FooterSection = ({
    label,
    icon,
    children,
  }: {
    label: string;
    icon?: JSX.Element;
    children: React.ReactNode;
  }) => (
    <div>
      <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </h6>
      {children}
    </div>
  );

  function FooterLink({
    label,
    href,
    newTab,
    protectedPage,
  }: {
    label: string;
    href: string;
    newTab?: boolean;
    protectedPage?: boolean;
  }) {
    return (
      <p className="mb-4 last:mb-0">
        <Link
          href={href}
          target={newTab ? "_blank" : "_self"}
          className={cn(
            "flex text-neutral-600 hover:underline hover:decoration-slate-600 hover:underline-offset-2 dark:text-neutral-200",
            protectedPage && !isAuthenticated && "pointer-events-none",
          )}
        >
          {label} {protectedPage && !isAuthenticated && <Lock size={16} className="ml-1" />}
        </Link>
      </p>
    );
  }

  const IconItem = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 flex items-center justify-center last:mb-0 md:justify-start">{children}</p>
  );

  return (
    <footer className="mt-auto bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-800 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="flex justify-center">
          <SocialLink href="https://facebook.com/" icon={<Facebook size={20} aria-label="Facebook" />} />
          <SocialLink href="https://x.com/ropaolle" icon={<Twitter size={20} aria-label="X" />} />
          <SocialLink
            href="https://www.instagram.com/ropaolle/"
            icon={<Instagram size={20} aria-label="Instagram" />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/ropaolle/"
            icon={<Linkedin size={20} aria-label="LinkedIn" />}
          />
          <SocialLink href="https://github.com/ropaolle/" icon={<Github size={20} aria-label="GitHub" />} />
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterSection label="Artdatabanken" icon={<Qube />}>
            <p>Print your own species collections or save them as Pdf:s.</p>
          </FooterSection>

          <FooterSection label="Frameworks">
            <FooterLink label="NEXT.js" href="https://nextjs.org/" newTab />
            <FooterLink label="Tailwind CSS" href="https://tailwindcss.com/" newTab />
            <FooterLink label="Shadcn/UI" href="https://https://ui.shadcn.com/" newTab />
            <FooterLink label="Supabase" href="https://supabase.com/" newTab />
          </FooterSection>

          <FooterSection label="Useful links">
            <FooterLink label="Species" href="species" protectedPage />
            <FooterLink label="Images" href="images" protectedPage />
            <FooterLink label="Collections" href="collections" protectedPage />
            <FooterLink label="About" href="about" />
          </FooterSection>

          <FooterSection label="Contact">
            <IconItem>
              <Home size={20} className="mr-1" />
              Stockholm, SWEDEN
            </IconItem>
            <IconItem>
              <Email size={20} className="mr-1" />
              <Link
                className="hover:underline hover:decoration-slate-600 hover:underline-offset-2"
                href="mailto:info@gmail.com"
              >
                info@ropaolle.se
              </Link>
            </IconItem>
            <IconItem>
              <Phone size={20} className="mr-1" />
              <Link
                className="hover:underline hover:decoration-slate-600 hover:underline-offset-2"
                href="tel:+46 8 123456"
              >
                +46 8 123456
              </Link>
            </IconItem>
            <IconItem>
              <Web size={20} className="mr-1" />
              <Link
                className="hover:underline hover:decoration-slate-600 hover:underline-offset-2"
                href="https://www.ropaolle.se"
              >
                https://www.ropaolle.se
              </Link>
            </IconItem>
          </FooterSection>
        </div>
      </div>

      <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-800">
        <span>© 2023 Copyright: </span>
        <Link
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          href="https://www.ropaolle.se/"
          target="_blank"
        >
          RopaOlle
        </Link>
      </div>
    </footer>
  );
}
