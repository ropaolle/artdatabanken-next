import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import { SpeciesForm, type SpeciesType } from "@/components/forms";

export default async function SpeciesAdd({ params }: { params: { id: string } }) {
  const supabase = await createServerComponentClientWithCookies();
  const { data } = await supabase.from("species").select().eq("id", params.id).single();

  console.log("data", data);

  const species =
    data &&
    ({
      ...data,
      date: data.date && new Date(data.date),
    } as SpeciesType);

  console.log("species", species);

  return (
    <>
      <h1>Edit species</h1>
      <div className=" max-w-lg2">
        <SpeciesForm values={species} />
      </div>
    </>
  );
}
