import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import SpeciesTable from "./SpeciesTable";

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data } = await supabase.from("species").select(`
    *,
    images (thumbnail_url)
  `);

  return <>{data && <SpeciesTable rows={data} />}</>;
}
