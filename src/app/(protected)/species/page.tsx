import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";

//TODO: Why should we use dynamic imports? - https://tailwind-elements.com/docs/standard/integrations/next-integration/
import dynamic from "next/dynamic";
// import SpeciesTable from "./SpeciesTable";
const DynamicSpeciesTable = dynamic(() => import("./SpeciesTable"), {
  ssr: false,
});

export default async function Images() {
  const supabase = await createServerComponentClientWithCookies();
  const { data } = await supabase.from("species").select(`
    *,
    images (thumbnail_url)
  `);

  return <>{data && <DynamicSpeciesTable rows={data} />}</>;
  // return <>{data && <SpeciesTable rows={data} />}</>;
}
