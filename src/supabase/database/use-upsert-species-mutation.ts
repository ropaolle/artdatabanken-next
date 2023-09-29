import { useBroadcast } from "@/components/hooks/useBroadcast";
import type { Species } from "@/types/app.types";
import { useMutation } from "@tanstack/react-query";
import { upsertSpeciesById } from "./queries/upsert-species-by-id";
import useSupabase from "./use-supabase";

export default function useUpsertSpeciesMutation() {
  const client = useSupabase();
  const broadcast = useBroadcast("app", "updates");

  return useMutation(async (data: Partial<Species>) => {
    broadcast(data, data?.id ? "species-updated" : "species-created");
    return upsertSpeciesById(client, data).then((result) => result.data);
  });
}
