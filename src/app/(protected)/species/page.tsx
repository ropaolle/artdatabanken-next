import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import SpeicesTable from "./SpeciesTable";
import { columns } from "./columns";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Species() {
  // console.log("images page ", new Date().toLocaleTimeString());

  const supabase = await createServerComponentClientWithCookies();
  const { data: rows } = await supabase.from("species").select(`
    *,
    images (thumbnail_url)
  `);

  // await sleep(11000);

  // console.log('rows', rows);

  return <div className="container mx-auto py-10">{rows && <SpeicesTable columns={columns} data={rows} />}</div>;
}
