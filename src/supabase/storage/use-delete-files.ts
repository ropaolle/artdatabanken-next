import { useAppStore } from "@/state";
import useSupabase from "../hooks/use-supabase";

export function useDeleteFiles() {
  const { user } = useAppStore();
  const client = useSupabase();

  const deleteFiles = async (bucket: string, paths: string[], prefixPathWithUserId = true) => {
    if (prefixPathWithUserId && !user?.id) {
      return { error: "No user found!", data: null };
    }

    const prefixedPaths = prefixPathWithUserId ? paths.map((path) => user?.id + "/" + path) : paths;

    return await client.storage.from(bucket).remove(prefixedPaths);
  };

  return deleteFiles;
}
