import type { CustomClient, SpeciesImage } from "@/types/app.types";

export function getSpeciesById(client: CustomClient, id: string) {
  return (
    client
      .from("species")
      .select(
        `
        *,
        image (id, filename, thumbnail_url)
      `,
      )
      .eq("id", id)
      .single<SpeciesImage>()
      .throwOnError()
  );
}
