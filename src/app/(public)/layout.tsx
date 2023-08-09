import "../globals.css";
import "tw-elements/dist/css/tw-elements.min.css";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/lib/auth";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const authUser = user
  //   ? {
  //       id: user.id,
  //       role: user.role,
  //       email: user.email,
  //       gravatar: '',
  //     }
  //   : null;

  // if (!user) {
  //   redirect("/");
  // }

  const user = await getUser();

  //  if (!user) {
  //   redirect("/");
  // }

  return (
    <>
      <Navbar user={user} />
      <main className="flex items-center justify-center p-16 lg:justify-between">{children}</main>
      <Footer />
    </>
  );
}