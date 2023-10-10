import type { CustomClient } from "@/types/app.types";

export function getUserById(client: CustomClient, id: string) {
  return client.from("users").select().eq("id", id).single().throwOnError();
}
