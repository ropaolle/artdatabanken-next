import type { CustomClient } from "@/types/app.types";

export function getImageByFilename(client: CustomClient, filename: string) {
  return client.from("image").select().eq("filename", filename).single().throwOnError();
}
