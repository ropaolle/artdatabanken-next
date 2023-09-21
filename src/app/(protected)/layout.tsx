import Footer from "@/components/Footer";
import Header from "@/components/Header";
import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import { fetchUser } from "@/lib/supabase";
import { redirect } from "next/navigation";
import "../globals.css";
import { useAppStore } from "@/state";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  // const state = useAppStore.getState();
  // console.log('state', state);

  const supabase = await createServerComponentClientWithCookies();
  const userPromise = fetchUser(supabase);
  // const isAuthenticatedPromise = userPromise.then((user) => Boolean(user?.id));

  // TODO: How to keep this check?
  // if (!user) {
  //   redirect("/login/?message=You are not authorized to access that resource.");
  // }

  return (
    <>
      <Header userPromise={userPromise} />
      <main className="container my-8 min-h-[20rem]">{children}</main>
      <Footer /* isAuthenticated={isAuthenticatedPromise} */ />
    </>
  );
}
