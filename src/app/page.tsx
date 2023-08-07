import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Footer, Navigation, Test } from "../components";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  console.log("supabase", supabase);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="">
      <Navigation user={user} />

      <Test />

      <Footer />
    </div>
  );
}
