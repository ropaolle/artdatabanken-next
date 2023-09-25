import { useAppStore } from "@/state";
import useSupabase from "../hooks/use-supabase";

type Options = { upsert?: boolean; prefixPathWithUserId?: boolean };

export default function useUploadFile() {
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

    return await client.storage.from(bucket).upload(prefixedPath, file, {
      cacheControl: "3600",
      upsert,
    });
  };

  return uploadFile;
}
