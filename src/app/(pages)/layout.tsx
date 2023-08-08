import "../globals.css";
import "tw-elements/dist/css/tw-elements.min.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user} />
      <main className="flex items-center justify-center p-16 lg:justify-between">{children}</main>
      <Footer />
    </>
  );
}
