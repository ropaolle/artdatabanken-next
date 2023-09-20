import type { Image, User } from "@/types/app.types";
import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { gravatarURL } from "./utils";

const fetchUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    role: user.role,
    email: user.email,
    gravatar: gravatarURL(user.email || ""),
  } as User;
};

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

const getPublicUrl = (supabase: SupabaseClient, bucket: string, path: string | undefined) => {
  if (!bucket || !path) return;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const imageExists = async (supabase: SupabaseClient, filename: string) => {
  if (!filename) return false;
  const { data } = await supabase.from("images").select().eq("filename", filename);

  return Boolean(data);
};

const getImageId = async (supabase: SupabaseClient, userId: string, filename: string) => {
  if (!filename) return;
  const { data /* , error */ } = await supabase
    .from("images")
    .select()
    .eq("user_id", userId)
    .eq("filename", filename)
    .single<Image>();

  return data?.id;
};

export {
  fetchUser,
  getImageId,
  getPublicUrl,
  imageExists,
  uploadFileToSupabase,
};
