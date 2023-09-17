import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const uploadFileToSupabase = async (
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

const getPublicUrl = (supabase: SupabaseClient, bucket?: string, path?: string) => {
  if (!bucket || !path) return;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
};

const getBaseUrl = (supabase: SupabaseClient, bucket?: string, path?: string) => {
  const publicUrl = getPublicUrl(supabase, bucket, path);

  return publicUrl && publicUrl.replace(`${path}`, "");
};

const imageExists = async (supabase: SupabaseClient, filename: string) => {
  if (!filename) return false;
  const { data } = await supabase.from("images").select().eq("filename", filename);

  return Boolean(data);
};

const getImageId = async (supabase: SupabaseClient, filename: string) => {
  if (!filename) return false;
  const { data } = await supabase.from("images").select().eq("filename", filename).single();

  return data?.id;
};

export { uploadFileToSupabase, getPublicUrl, getBaseUrl, imageExists, getImageId };
