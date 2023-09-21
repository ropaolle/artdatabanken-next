import Confirmer from "@/components/hooks/Confirmer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ClientAppStoreInitializer from "@/state/ClientAppStoreInitializer";
import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import { fetchUser } from "@/lib/supabase";
import { useAppStore } from "@/state";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initServerAppStore = async () => {
    const supabase = await createServerComponentClientWithCookies();
    const user = await fetchUser(supabase);
    useAppStore.setState({ user });
  };

  initServerAppStore();

  return (
    <html lang="en" className="light">
      <body>
        {/* Initializes the local client app store. Can only be accessed from the client. */}
        <ClientAppStoreInitializer />
        {children}
        <Confirmer />
        <Toaster />
      </body>
    </html>
  );
}
