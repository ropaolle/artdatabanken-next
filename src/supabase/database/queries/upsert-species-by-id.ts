import type { CustomClient, Species } from "@/types/app.types";
// import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function upsertSpeciesById(client: CustomClient, data: Partial<Species>) {
  return client.from("species").upsert(data).select().throwOnError().single();
}
