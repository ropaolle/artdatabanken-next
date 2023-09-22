import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function uploadFileToSupabase(
  supabase: SupabaseClient,
  file: Blob | File,
  bucket: string,
  path: string,
  upsert = false,
) {
  const { /* data,  */ error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert,
  });

  if (error?.message === "The resource already exists") {
    console.error(error?.message);
    return;
  }

  if (error) {
    console.error(error);
    return;
  }
}
