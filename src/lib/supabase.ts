import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const uploadFileToSupabase = async (supabase: SupabaseClient, file: Blob, name: string, upsert = false) => {
  const { data, error } = await supabase.storage.from("images").upload(name, file, {
    cacheControl: "3600",
    upsert,
  });

  if (error?.message === "The resource already exists") {
    // ask to try again
    return;
  }

  if (error) {
    console.error(error);
    return;
  }
};


export const getPublicUrl = (supabase: SupabaseClient,bucket: string, path:string) => {
  const { data } = supabase
  .storage
  .from(bucket)
  .getPublicUrl(path)

  // console.error(error)

  return data;
}