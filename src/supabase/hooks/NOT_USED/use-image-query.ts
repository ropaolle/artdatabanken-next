import { useQuery } from "@tanstack/react-query";
import { getImageById } from "./get-image-by-id";
import useSupabase from "./use-supabase";

export default function useImageQuery(imageId: string) {
  const client = useSupabase();
  const key = ["image", imageId];

  return useQuery(key, async () => {
    return getImageById(client, imageId).then((result) => result.data);
  });
}
