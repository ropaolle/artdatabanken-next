import Link from "next/link";
import {
  Box as Qube,
  Home,
  Mail as Email,
  Phone,
  Globe as Web,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Lock,
} from "lucide-react";
import { type User } from "@/lib/auth";

export default function Footer({ user }: { user: User | null }) {
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

  const FooterLink = ({
    label,
    href,
    newTab = false,
    protectedPage = false,
  }: {
    label: string;
    href: string;
    newTab?: boolean;
    protectedPage?: boolean;
  }) => (
    <p className="mb-4 last:mb-0">
      <Link
        href={href}
        target={newTab ? "_blank" : "_self"}
        className={`flex text-neutral-600 dark:text-neutral-200 ${protectedPage && !user && "pointer-events-none"}`}
      >
        {label} {protectedPage && !user && <Lock size={16} className="ml-1"/>}
      </Link>
    </p>
  );

  const IconItem = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 flex items-center justify-center last:mb-0 md:justify-start">{children}</p>
  );

  return (
    <>
      <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div className="flex justify-center">
            <SocialLink href="https://facebook.com/" icon={<Facebook size={20}/>} />
            <SocialLink href="https://twitter.com/ropaolle" icon={<Twitter size={20} />} />
            {/* <SocialLink href="https://www.google.com/" icon={<Google />} /> */}
            <SocialLink href="https://www.instagram.com/ropaolle/" icon={<Instagram size={20} />} />
            <SocialLink href="https://www.linkedin.com/in/olof-sj%C3%B6gren/" icon={<Linkedin size={20} />} />
            <SocialLink href="https://github.com/ropaolle/" icon={<Github size={20} />} />
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
                <Link href="mailto:info@gmail.com">info@ropaolle.se</Link>
              </IconItem>
              <IconItem>
                <Phone size={20} className="mr-1" />
                <Link href="tel:+46 8 123456">+46 8 123456</Link>
              </IconItem>
              <IconItem>
                <Web size={20} className="mr-1" />
                <Link href="https://www.ropaolle.se">https://www.ropaolle.se</Link>
              </IconItem>
            </FooterSection>
          </div>
        </div>

        <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
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
    </>
  );
}
