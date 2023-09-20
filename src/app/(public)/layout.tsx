import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";
import { fetchUser } from "@/lib/supabase";
import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerComponentClientWithCookies();
  const user = await fetchUser(supabase);

  return (
    <>
      <Header user={user} />
      <main className="container my-8">{children}</main>
      <Footer user={user} />
    </>
  );
}
