import type { CustomClient } from "@/types/app.types";

export function getImageByFilenameQuery(client: CustomClient, filenameQuery: string) {
  return client
    .from("images")
    .select("filename, id")
    .like("filename", `%${filenameQuery}%`)
    .order("filename", { ascending: true })
    .limit(10)
    // .single()
    .throwOnError();
}
