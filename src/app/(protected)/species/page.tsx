import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import SpeciesTable from "./SpeciesTable";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Species() {
  const supabase = await createServerComponentClientWithCookies();
  const { data: rows } = await supabase.from("species").select(`
    *,
    images (thumbnail_url)
  `);

  return <div className="container mx-auto py-10">{rows && <SpeciesTable rows={rows} />}</div>;
}
