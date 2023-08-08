import "./globals.css";
import "tw-elements/dist/css/tw-elements.min.css";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>{children}</section>
  );
}
