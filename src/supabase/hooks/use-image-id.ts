import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";

export default function useImageId(filename: string | undefined) {
  const client = useSupabase();
  const key = ["images", filename];

  return useQuery(
    key,
    async () => {
      return (
        filename &&
        (await client
          .from("images")
          .select("id")
          .eq("filename", filename)
          .then(({ data }) => (Array.isArray(data) && data.length ? data[0].id : undefined)))
      );
    },
    { retry: false, enabled: !!filename },
  );
}
