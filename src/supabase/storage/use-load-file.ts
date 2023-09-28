import { useAppStore } from "@/state";
import useSupabase from "../database/use-supabase";

export function useLoadFile() {
  const { user } = useAppStore();
  const client = useSupabase();

  //TODO: useMemo?
  const loadFile = async (bucket: string, path: string, prefixPathWithUserId = true) => {
    if (prefixPathWithUserId && !user?.id) {
      return { error: "No user found!", data: null };
    }

    const prefixedPath = `${prefixPathWithUserId && user?.id + "/"}${path}`;

    return await client.storage.from(bucket).download(prefixedPath);
  };

  return loadFile;
}
