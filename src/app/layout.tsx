import Confirmer from "@/components/hooks/Confirmer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AppStoreInitializer from "@/state/AppStoreInitializer";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>
        {/* Initializes the local client app store. Can only be accessed from the client. */}
        <AppStoreInitializer />
        {children}
        <Confirmer />
        <Toaster />
      </body>
    </html>
  );
}
