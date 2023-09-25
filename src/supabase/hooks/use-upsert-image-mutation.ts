import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { Image } from "@/types/app.types";
import { upsertImageById } from "./upsert-image-by-id";

export default function useUpsertImageMutation() {
  const client = useSupabase();

  return useMutation(async (data: Partial<Image>) => {
    return upsertImageById(client, data).then((result) => result.data);
  });
}
