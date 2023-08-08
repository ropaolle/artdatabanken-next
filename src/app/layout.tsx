import "./globals.css";
import "tw-elements/dist/css/tw-elements.min.css";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>{children}</body>
    </html>
  );
}
