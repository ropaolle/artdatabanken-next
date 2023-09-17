import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageTable from "./ImageTable";

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data: rows, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("updated_at", { ascending: true });
  // .limit(11);

  return (
    <>
      <h1>Images</h1>
      {<ImageTable rows={rows|| []} count={count || 0} />}
    </>
  );
}
