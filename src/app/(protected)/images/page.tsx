import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageTable from "./ImageTable";
// import { sleep } from "@/lib";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Images() {
  console.log("images page ", new Date().toLocaleTimeString());

  const supabase = await createServerComponentClientWithCookies();
  const { data: rows, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("updated_at", { ascending: true })
    .limit(4);

  // await sleep(11000);

  return rows && count && <ImageTable rows={rows} count={count} />;
}
