import type { CustomClient } from "@/types/app.types";

export function deleteUserById(client: CustomClient, id: string) {
  return client.from("users").delete().eq("id", id).throwOnError();
}
