import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
// import ImageTable from "./ImageTable";
import CustomTable from "@/components/CustomTable";
import { columns } from "./columns";

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data: rows, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("updated_at", { ascending: true })
    .limit(4);

  return <div className="container mx-auto py-10">{rows && <CustomTable columns={columns} data={rows} />}</div>;
}
