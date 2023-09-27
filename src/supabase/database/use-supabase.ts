import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMemo } from "react";

export default function useSupabase() {
  return useMemo(() => createClientComponentClient<Database>(), []);
}
