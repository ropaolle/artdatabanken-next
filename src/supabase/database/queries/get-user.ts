import type { CustomClient } from "@/types/app.types";

export function getUser(client: CustomClient) {
  return (
    client
      .from("users")
      .select()
      // .order("filename", { ascending: true })
      .limit(100)
      .throwOnError()
  );
  // .returns<Image[]>();
}
