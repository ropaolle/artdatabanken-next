import type { CustomClient } from "@/types/app.types";

export function getImageById(client: CustomClient, id: string) {
  return client.from("image").select().eq("id", id).single().throwOnError();
}
