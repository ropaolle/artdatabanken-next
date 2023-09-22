import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const imageExists = async (supabase: SupabaseClient, filename: string) => {
  if (!filename) return false;
  const { data } = await supabase.from("images").select().eq("filename", filename);

  return Boolean(data);
};
