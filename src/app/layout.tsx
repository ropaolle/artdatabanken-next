import Confirmer from "@/components/hooks/Confirmer";
import { Toaster } from "@/components/ui/toaster";
import ClientAppStoreInitializer from "@/state/ClientAppStoreInitializer";
import "./globals.css";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const supabase = await createServerComponentClientWithCookies();
  // const user = await fetchUser(supabase);
  // useAppStore.setState({ user });

  // const initServerAppStore = async () => {
  //   const supabase = await createServerComponentClientWithCookies();
  //   const user = await fetchUser(supabase);
  //   useAppStore.setState({ user });
  // };

  // initServerAppStore();

  return (
    <html lang="en" className="light">
      <body>
        <ClientAppStoreInitializer />
        {children}
        <Confirmer />
        <Toaster />
      </body>
    </html>
  );
}
