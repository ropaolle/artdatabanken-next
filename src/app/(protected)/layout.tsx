import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchServerUser } from "@/supabase/fetchUser/fetchServerUser";
import { redirect } from "next/navigation";
import "../globals.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const { user } = await fetchServerUser();

  if (!user) {
    redirect("/login/?message=You are not authorized to access that resource.");
  }

  return (
    <>
      <Header />
      <main className="container my-8 min-h-[20rem]">{children}</main>
      <Footer />
    </>
  );
}
