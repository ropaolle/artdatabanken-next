import type { CustomClient } from "@/types/app.types";

export function getImage(client: CustomClient) {
  return client
    .from("images")
    .select()
    // .order("filename", { ascending: true })
    .limit(100)
    .throwOnError()
    // .returns<Image[]>();
}
