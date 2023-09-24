import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { Species } from "@/types/app.types";
import { upsertSpeciesById } from "./upsert-species-by-id";

export default function useUpsertSpeciesMutation() {
  const client = useSupabase();

  // return useMutation(async ({ data }: { data: Partial<Species> }) => {
  return useMutation(async (data: Partial<Species>) => {
    return upsertSpeciesById(client, data).then((result) => result.data);
  });
}
