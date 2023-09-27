import type { /* CustomClient, */ Image } from "@/types/app.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getImage(client: SupabaseClient) {
  return client
    .from("images")
    .select()
    // .order("filename", { ascending: true })
    .limit(100)
    .throwOnError()
    // .returns<Image[]>();
}
