import { useAppStore } from "@/state";
import useSupabase from "../database/use-supabase";
import { useMemo } from "react";

/**
 * Example:
 * - https://yeebxkyqwarhmbfpkgir.supabase.co/storage/v1/object/public/images/44638182-269a-48d8-84f0-c538e2671f44/image066.jpg
 * - `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${bucket}/${userId}/${path}`
 */

export function usePublicUrl() {
  const { user } = useAppStore();
  const client = useSupabase();

  return useMemo(
    () =>
      (bucket: string, path: string | undefined, prefixPathWithUserId = true) => {
        if ((prefixPathWithUserId && !user?.id) || !bucket || !path) return;

        const {
          data: { publicUrl },
        } = client.storage.from(bucket).getPublicUrl(prefixPathWithUserId ? user?.id + "/" + path : path);

        return publicUrl;
      },
    [client.storage, user?.id],
  );

  // returngetPublicUrl;
}
