import { useQuery } from "@tanstack/react-query";
import { getSpecies } from "./queries/get-species";
import { getSpeciesById } from "./queries/get-species-by-id";
import useSupabase from "./use-supabase";

export default function useSpeciesQuery() {
  const client = useSupabase();
  const key = ["species"];

  return useQuery(key, async () => {
    return getSpecies(client).then((result) => result.data);
  });
}

export function useSpeciesQueryById(id: string | undefined) {
  const client = useSupabase();
  const key = ["species", id];

  return useQuery(
    key,
    async () => {
      return getSpeciesById(client, id as string).then((result) => result.data);
    },
    { enabled: !!id },
  );
}
