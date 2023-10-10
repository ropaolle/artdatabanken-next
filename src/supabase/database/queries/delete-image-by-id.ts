import type { CustomClient } from "@/types/app.types";

export function deleteImageById(client: CustomClient, id: string) {
  return client.from("images").delete().eq("id", id).throwOnError();
}
