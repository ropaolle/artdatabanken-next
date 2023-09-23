import type { CustomClient } from "@/types/app.types";

export function getImageId(client: CustomClient, userId: string, filename: string) {
  return client
    .from("images")
    .select("id")
    .eq("user_id", userId)
    .eq("filename", filename)
    .single /* <{id:string | null}> */
    ()
    .throwOnError();
}
