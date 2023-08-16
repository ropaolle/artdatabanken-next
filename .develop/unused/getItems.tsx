import { cache } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/database.types";

export const revalidate = 5; // revalidate the data at most every hour

// type Images = Database["public"]["Tables"]["images"]["Row"];

export const getItems = cache(async () => {
  // const item = await db.item.findUnique({ id })
  const supabase = createClientComponentClient<Database>();
  const { data, count } = await supabase
    .from("images")
    .select("*", { count: "exact" /* , head: true  */ })
    .order("filename", { ascending: true })
    .limit(5);

  console.count("revalidate");

  return data;
});
