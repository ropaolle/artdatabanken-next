import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/database.types";
import SpeciesTable from "./SpeciesTable";

export default async function Images() {
  const supabase = createClientComponentClient<Database>();
  const { data } = await supabase.from("species").select(`
    *,
    images (thumbnail_url)
  `);

  // console.log("rows", data);

  return data && <SpeciesTable rows={data} />;
}
