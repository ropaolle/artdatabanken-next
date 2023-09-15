import createServerComponentClientWithCookies from "@/lib/createServerComponentClientWithCookies";
import ImageForm from "@/components/forms/ImageForm";

export default async function SpeciesAdd({ params }: { params: { id: string } }) {
  const supabase = await createServerComponentClientWithCookies();
  const { data } = await supabase.from("species").select().eq("id", params.id).single();

  // const species =
  //   data &&
  //   ({
  //     ...data,
  //     date: data.date && new Date(data.date),
  //   } as SpeciesType);

  return (
    <>
      <h1>Update image</h1>
      <div className=" max-w-lg2">
        <ImageForm values={} />
      </div>
    </>
  );
}
