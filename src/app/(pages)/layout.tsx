import "../globals.css";
import "tw-elements/dist/css/tw-elements.min.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gravatarURL } from "@/lib";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUser = user
    ? {
        id: user.id,
        role: user.role,
        email: user.email,
        gravatar: gravatarURL(user.email || ''),
      }
    : null;

  return (
    <>
      <Navbar user={authUser} />
      <main className="flex items-center justify-center p-16 lg:justify-between">{children}</main>
      <Footer />
    </>
  );
}
