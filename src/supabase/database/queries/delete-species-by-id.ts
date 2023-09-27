import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function deleteSpeciesById(client: SupabaseClient, id: string) {
  return client.from("species").delete().eq("id", id).throwOnError();
}
