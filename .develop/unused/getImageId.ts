import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Image } from "@/types/app.types";

export default async function getImageId(supabase: SupabaseClient, userId: string, filename: string) {
  if (!filename) return;
  const { data /* , error */ } = await supabase
    .from("images")
    .select()
    .eq("user_id", userId)
    .eq("filename", filename)
    .single<Image>();

  return data?.id;
}
