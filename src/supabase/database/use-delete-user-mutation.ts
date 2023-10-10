import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById } from "./queries/delete-user-by-id";
import useSupabase from "./use-supabase";

export default function useDeleteUserMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return deleteUserById(client, id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    },
  );
}
