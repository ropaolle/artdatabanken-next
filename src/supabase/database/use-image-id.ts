import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";

export default function useImageId(filename: string | undefined) {
  const client = useSupabase();
  const key = ["image-id", filename];

  return useQuery(
    key,
    async () => {
      return await client
        .from("images")
        .select("id")
        .eq("filename", filename || "")
        .then(({ data }) => (Array.isArray(data) && data.length ? data[0].id : null));
    },
    { retry: false, enabled: !!filename },
  );
}
