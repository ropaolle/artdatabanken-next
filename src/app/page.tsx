import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="">
      <Navbar user={user} />
      {/* <Navigation user={user} /> */}
      <Content />
      <Footer />
    </div>
  );
}
