import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpeciesById } from "./queries/delete-species-by-id";
import useSupabase from "./use-supabase";

export default function useDeleteSpeciesMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return deleteSpeciesById(client, id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["species"]);
      },
    },
  );
}
