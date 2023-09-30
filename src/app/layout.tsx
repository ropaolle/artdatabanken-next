import Confirmer from "@/hooks/Confirmer";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryClientProvider from "./reactQueryClientProvider";
import ClientAppStoreInitializer from "@/state/ClientAppStoreInitializer";
import "./globals.css";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata = {
  title: "Artdatabanken",
  description: "Artdatabanken with NextJS, Tailwind, Shadcn UI and Supabase.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>
        <ReactQueryClientProvider>
          <ClientAppStoreInitializer />
          {children}
          <Confirmer />
          <Toaster />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
