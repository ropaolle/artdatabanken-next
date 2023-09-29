import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpeciesById } from "./queries/delete-species-by-id";
import useSupabase from "./use-supabase";
import { useBroadcast } from "@/components/hooks/useBroadcast";

export default function useDeleteSpeciesMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const broadcast = useBroadcast("app", "updates");

  return useMutation(
    async ({ id, brodcastMessage }: { id: string; brodcastMessage?: unknown }) => {
      broadcast(brodcastMessage || id, "species-deleted");
      return deleteSpeciesById(client, id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["species"]);
      },
    },
  );
}
