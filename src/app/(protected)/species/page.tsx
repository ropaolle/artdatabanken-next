import SpeciesTable from "./SpeciesTable";

// TODO: Not working as expected. Always seems to be cached for 60 seconds, regardless of revalidate or "force-dynamic".
// export const revalidate = 0
// export const dynamic = "force-dynamic";

export default async function Species() {
  return (
    <>
      <h1>Species</h1>
      {<SpeciesTable />}
    </>
  );
}
