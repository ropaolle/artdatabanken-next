import { useQuery } from "@tanstack/react-query";
import { getUser } from "./queries/get-user";
import { getUserById } from "./queries/get-user-by-id";
import useSupabase from "./use-supabase";

function useUserQuery() {
  const client = useSupabase();
  const key = ["users"];

  return useQuery(key, async () => {
    return getUser(client).then((result) => result.data);
  });
}

function useUserQueryById(id: string | undefined) {
  const client = useSupabase();
  const key = ["user", id];

  return useQuery(
    key,
    async () => {
      return getUserById(client, id as string).then((result) => result.data);
    },
    { enabled: !!id },
  );
}

export { useUserQuery, useUserQueryById };
