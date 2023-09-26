import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageById } from "./delete-image-by-id";
import useSupabase from "./use-supabase";

export default function useDeleteImageMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return deleteImageById(client, id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images"]);
      },
    },
  );
}
