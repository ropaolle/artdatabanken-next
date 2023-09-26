import { Image } from "@/types/app.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertImageById } from "./upsert-image-by-id";
import useSupabase from "./use-supabase";

export default function useUpsertImageMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(async (data: Partial<Image>) => {
    return upsertImageById(client, data).then((result) => result.data);
  });
}
