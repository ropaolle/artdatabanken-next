import type { CustomClient, Image } from "@/types/app.types";
// import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function upsertImageById(client: CustomClient, data: Partial<Image>) {
  return client.from("images").upsert(data).select().throwOnError().single();
}
