import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const uploadFileToSupabase = async (
  supabase: SupabaseClient,
  file: Blob | File,
  bucket: string,
  path: string,
  upsert = false,
) => {  
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
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
};

export const getPublicUrl = (supabase: SupabaseClient, bucket?: string, path?: string) => {
  if (!bucket || !path) return {};

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  const basePath = publicUrl.replace(`${path}`, "");

  return { publicUrl, basePath };
};
