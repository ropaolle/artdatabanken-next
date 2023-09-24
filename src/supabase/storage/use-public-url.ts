import { useAppStore } from "@/state";
import useSupabase from "../hooks/use-supabase";

export function usePublicUrl() {
  const { user } = useAppStore();
  const client = useSupabase();

  const getPublicUrl = (bucket: string, path: string /*  | undefined */, prefixPathWithUserId = true) => {
    if ((prefixPathWithUserId && !user?.id) || !bucket || !path) return;

    const {
      data: { publicUrl },
    } = client.storage.from(bucket).getPublicUrl(prefixPathWithUserId ? user?.id + "/" + path : path);

    return publicUrl;
  };

  return getPublicUrl;
}
