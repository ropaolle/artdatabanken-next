import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
9;
