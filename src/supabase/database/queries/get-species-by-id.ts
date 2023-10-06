import type { SpeciesImage, CustomClient } from "@/types/app.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

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
