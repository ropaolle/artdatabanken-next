import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import SpeciesTable from "./SpeciesTable";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Species() {
  const supabase = await createServerComponentClientWithCookies();
  const { data: rows, count } = await supabase
    .from("species")
    .select(
      `
    *,
    image (id, thumbnail_url)
    `,
      { count: "exact" /* , head: true  */ },
    )
    .order("updated_at", { ascending: true })
    .limit(100);

  console.log('rows', rows);  

  return (
    <>
      <h1>Species</h1>
      {rows && <SpeciesTable rows={rows} count={count} />}
    </>
  );
}
