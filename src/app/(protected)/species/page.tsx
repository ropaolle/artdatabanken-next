import {createServerComponentClientWithCookies} from "@/supabase/server";
import type { SpeciesImage } from "@/types/app.types";
import SpeciesTable from "./SpeciesTable";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Species() {
  const supabase = await createServerComponentClientWithCookies();
  const { data, count } = await supabase
    .from("species")
    .select(
      `
      *,
      image (id, thumbnail_url)
    `,
      { count: "exact" /* , head: true  */ },
    )
    .order("updated_at", { ascending: true })
    .limit(100)
    // TODO: [Relationships between tables are not typed correctly](https://github.com/supabase/cli/issues/736)
    .returns<SpeciesImage[]>();

  return (
    <>
      <h1>Species</h1>
      {<SpeciesTable rows={data || []} count={count} />}
    </>
  );
}
