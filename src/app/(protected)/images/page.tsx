import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageTable from "./ImageTable";

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data: rows, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("updated_at", { ascending: true })
    .limit(11);

  return (
    <>
      <div className="container mx-auto py-10">{rows && <ImageTable rows={rows} />}</div>
    </>
  );
}
