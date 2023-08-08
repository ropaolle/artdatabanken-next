import Link from "next/link";
import { Qube, Home, Email, Phone, Fax, Facebook, Twitter, Google, Instagram, Linkedin, Github } from "./svgs";

export default function Footer() {
  const SocialLink = ({ href, icon }: { href: string; icon: JSX.Element }) => (
    <Link href={href} className="mr-6 text-neutral-600 dark:text-neutral-200">
      {icon}
    </Link>
  );

  const FooterHeader = ({ label, icon }: { label: string; icon?: JSX.Element }) => (
    <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
      {icon}
      {label}
    </h6>
  );

  const FooterLink = ({ label, href }: { label: string; href: string }) => (
    <p className="mb-4 last:mb-0">
      <Link href={href} className="text-neutral-600 dark:text-neutral-200">
        {label}
      </Link>
    </p>
  );

  const IconItem = ({ children, icon }: { children: React.ReactNode; icon: JSX.Element }) => (
    <p className="mb-4 last:mb-0 flex items-center justify-center md:justify-start">
      {icon}
      {children}
    </p>
  );

  return (
    <>
      <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div className="flex justify-center">
            <SocialLink href="#" icon={<Facebook />} />
            <SocialLink href="#" icon={<Twitter />} />
            <SocialLink href="#" icon={<Google />} />
            <SocialLink href="#" icon={<Instagram />} />
            <SocialLink href="#" icon={<Linkedin />} />
            <SocialLink href="#" icon={<Github />} />
          </div>
        </div>

        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <FooterHeader label="Artdatabanken" icon={<Qube />} />
              <p>Print your own species collections or save them as Pdf:s.</p>
            </div>

            <div>
              <FooterHeader label="Frameworks" />
              <FooterLink label="NEXT.js" href="https://nextjs.org/" />
              <FooterLink label="Tailwind CSS" href="https://tailwindcss.com/" />
              <FooterLink label="Tailwind Elements" href="https://tailwind-elements.com/" />
              <FooterLink label="Supabase" href="https://supabase.com/" />
            </div>

            <div>
              <FooterHeader label="Useful links" />
              <FooterLink label="Species" href="species" />
              <FooterLink label="Images" href="images" />
              <FooterLink label="Collections" href="collections" />
              <FooterLink label="About" href="about" />
            </div>

            <div>
              <FooterHeader label="Contact" />
              <IconItem icon={<Home />}>Stockholm, SWEDEN</IconItem>
              <IconItem icon={<Email />}>info@ropaolle.se</IconItem>
              <IconItem icon={<Phone />}>+ 01 234 567 89</IconItem>
              <IconItem icon={<Fax />}>+ 01 234 567 89</IconItem>
            </div>
          </div>
        </div>

        <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
          <span>© 2023 Copyright: </span>
          <a className="font-semibold text-neutral-600 dark:text-neutral-400" href="https://tailwind-elements.com/">
            RopaOlle
          </a>
        </div>
      </footer>
    </>
  );
}
