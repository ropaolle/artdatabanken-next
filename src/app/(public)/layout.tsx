import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";
import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import { fetchUser } from "@/lib/supabase";
import { useAppStore } from "@/state";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerComponentClientWithCookies();
  const user = await fetchUser(supabase);
  useAppStore.setState({ user });

  return (
    <>
      <Header />
      <main className="container my-8">{children}</main>
      <Footer />
    </>
  );
}
