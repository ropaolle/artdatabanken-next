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
  // TODO: https://github.com/vercel/next.js/issues/50119
  // throw new Error('Root layout error - should trigger /app/global-error.tsx')

  return (
    <html lang="en" className="dark">
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
