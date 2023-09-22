import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function getPublicUrl(supabase: SupabaseClient, bucket: string, path: string | undefined) {
  if (!bucket || !path) return;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
