import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Footer, Navigation, Test } from "../components";
import MyComponent from "@/components/MyComponent";
import Chips from "@/components/Chips"

export const dynamic = "force-dynamic";

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <div className="">
      {/* <Navigation user={user} /> */}
      <MyComponent />
      <Chips />

      <Test />

      <Footer />
    </div>
  );
}
