// import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";

// //TODO: Why should we use dynamic imports? - https://tailwind-elements.com/docs/standard/integrations/next-integration/
// import dynamic from "next/dynamic";
// // import SpeciesTable from "./SpeciesTable";
// const DynamicSpeciesTable = dynamic(() => import("./SpeciesTable"), {
//   ssr: false,
// });

// export default async function Images() {
//   const supabase = await createServerComponentClientWithCookies();
//   const { data } = await supabase.from("species").select(`
//     *,
//     images (thumbnail_url)
//   `);

//   return <>{data && <DynamicSpeciesTable rows={data} />}</>;
//   // return <>{data && <SpeciesTable rows={data} />}</>;
// }


import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageTable, { /* type Image, */ columns } from "./SpeciesTable";

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

  return <div className="container mx-auto py-10">{rows && <ImageTable columns={columns} data={rows} />}</div>;
}
