import type { CustomClient } from "@/types/app.types";

export function deleteSpeciesById(client: CustomClient, id: string) {
  return client.from("species").delete().eq("id", id).throwOnError();
}
