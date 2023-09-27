import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function deleteImageById(client: SupabaseClient, id: string) {
  return client.from("images").delete().eq("id", id).throwOnError();
}
