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

  return (
    <>
      <Header user={user} />
      <main className="container my-8 min-h-[20rem]">{children}</main>
      <Footer user={user} />
    </>
  );
}
