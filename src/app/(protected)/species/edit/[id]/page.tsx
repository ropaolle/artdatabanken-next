import { createServerComponentClientWithCookies } from "@/supabase/server";
import { SpeciesForm, type SpeciesType } from "@/components/forms";
import useSpeciesQuery from "@/supabase/hooks/use-species-query";

export default async function SpeciesAdd({ params }: { params: { id: string } }) {
  // const supabase = createServerComponentClientWithCookies();
  // const { data, error } = await supabase.from("species").select().eq("id", params.id).single();
  
  // if (error || !data) {
  //   console.error(error, data);
  //   return;
  // }

  // const species =
  //   data &&
  //   ({
  //     ...data,
  //     date: data.date && new Date(data.date),
  //   } as SpeciesType);

  return (
    <>
      <h1>Edit species</h1>
      <div className=" max-w-lg2">
        <SpeciesForm /* values={species} */ id={params.id} />
      </div>
    </>
  );
}
