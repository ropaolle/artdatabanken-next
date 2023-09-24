import { useAppStore } from "@/state";
import useSupabase from "./use-supabase";

export function usePublicUrl(bucket: string, path: string | undefined) {
  const { user } = useAppStore();
  const client = useSupabase();

  if (!user?.id || !bucket || !path) return;

  const {
    data: { publicUrl },
  } = client.storage.from(bucket).getPublicUrl(user.id + "/" + path);

  return publicUrl;
}

// const filename = images?.find(({ id }) => image === id)?.filename;
// const path = user?.id + "/" + suffixFilename(filename, "-crop");
// const url = getPublicUrl(supabase, "images", path);
// setPreviewURL(user && filename ? url : undefined);
