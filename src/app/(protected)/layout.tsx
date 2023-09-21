import Footer from "@/components/Footer";
import Header from "@/components/Header";
import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import { fetchUser } from "@/lib/supabase";
import { redirect } from "next/navigation";
import "../globals.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerComponentClientWithCookies();
  const user = await fetchUser(supabase);

  if (!user) {
    redirect("/login/?message=You are not authorized to access that resource.");
  }

  // TODO: Pass user this as a promise to the client side
  
  return (
    <>
      <Header user={user} />
      <main className="container my-8 min-h-[20rem]">{children}</main>
      <Footer user={user} />
    </>
  );
}


// pnpm i @tanstack/react-table@latest
// pnpm i @supabase/supabase-js@latest
// pnpm i @types/node@latest
// pnpm i @types/react@latest
// pnpm i @supabase/auth-helpers-nextjs@latest
// pnpm i autoprefixer@latest
// pnpm i postcss@latest
// pnpm i react-day-picker@latest
// pnpm i react-hook-form@latest
// pnpm i eslint-config-next@latest
// pnpm i next@latest
// pnpm i supabase@latest
// pnpm i lucide-react@latest