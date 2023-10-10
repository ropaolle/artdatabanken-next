import type { CustomClient, SpeciesImage } from "@/types/app.types";

export function getSpecies(client: CustomClient) {
  return client
    .from("species")
    .select(
      `
      *,
      image (id, thumbnail_url)
    `,
    )
    .order("updated_at", { ascending: true })
    .limit(100)
    .throwOnError()
    .returns<SpeciesImage[]>();
}
