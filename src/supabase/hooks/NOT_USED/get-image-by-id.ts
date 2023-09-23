import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getImageById(client: SupabaseClient, imageId: string) {
  return client
    .from("images")
    .select(
      `
    id,
    filename
    `,
    )
    .eq("id", imageId)
    .throwOnError()
    .single();
}
