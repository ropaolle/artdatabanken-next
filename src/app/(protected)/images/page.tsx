import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageTable from "./ImageTable";

// export const dynamic = 'force-dynamic'

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("updated_at", { ascending: true });
  // .limit(11);

  // TODO: getUserId from server and pass ass a promise

  return (
    <>
      <h1>Images</h1>
      {<ImageTable rows={data || []} count={count || 0} />}
    </>
  );
}
