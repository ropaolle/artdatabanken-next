import { useQuery } from "@tanstack/react-query";
import { getSpecies } from "./get-species";
import useSupabase from "./use-supabase";
import { getSpeciesById } from "./get-species-by-id";

export default function useSpeciesQuery() {
  const client = useSupabase();
  const key = ["species"];

  return useQuery(key, async () => {
    return getSpecies(client).then((result) => result.data);
  });
}

export function useSpeciesQueryById(id: string) {
  const client = useSupabase();
  const key = ["species", id];

  return useQuery(key, async () => {
    return getSpeciesById(client, id).then((result) => result.data);
  });
}
