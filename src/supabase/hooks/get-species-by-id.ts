import type { SpeciesImage, CustomClient } from "@/types/app.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getSpeciesById(client: CustomClient, id: string) {
  return client.from("species").select().eq("id", id).single().throwOnError();
  // .returns<SpeciesImage[]>();
}

// await supabase.from("species").select().eq("id", params.id).single();
