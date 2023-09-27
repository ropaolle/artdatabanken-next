import type { /* CustomClient, */ SpeciesImage } from "@/types/app.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getSpecies(client: SupabaseClient) {
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
