import type { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function createServerComponentClientWithCookies() {
  const tempCookies = cookies();
  return createServerComponentClient<Database>({ cookies: () => tempCookies });
}
