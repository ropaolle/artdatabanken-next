import { Species } from "@/types/app.types";
import { useMutation } from "@tanstack/react-query";
import { upsertSpeciesById } from "./queries/upsert-species-by-id";
import useSupabase from "./use-supabase";

export default function useUpsertSpeciesMutation() {
  const client = useSupabase();

  // return useMutation(async ({ data }: { data: Partial<Species> }) => {
  return useMutation(async (data: Partial<Species>) => {
    return upsertSpeciesById(client, data).then((result) => result.data);
  });
}
