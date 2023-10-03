import { useAppStore } from "@/state";
import { useState } from "react";
import useSupabase from "../database/use-supabase";

type Options = { upsert?: boolean; prefixPathWithUserId?: boolean };

export function useUploadFile() {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAppStore();
  const client = useSupabase();

  const uploadFile = async (
    file: Blob | File | undefined,
    bucket: string,
    path: string,
    { upsert = false, prefixPathWithUserId = true }: Options = {},
  ) => {
    if (!file) {
      return { error: "No file or blob object provided!", data: null };
    }

    if (prefixPathWithUserId && !user?.id) {
      return { error: "No user found!", data: null };
    }

    const prefixedPath = `${prefixPathWithUserId && user?.id + "/"}${path}`;

    setIsUploading(true);

    const result = await client.storage.from(bucket).upload(prefixedPath, file, {
      cacheControl: "3600",
      upsert,
    });

    setIsUploading(false);

    return result;
  };

  return { uploadFile, isUploading };
}
