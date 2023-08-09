"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { type Database } from "@/lib/database.types";

export default function Species() {
  const [todos, setTodos] = useState<Database["public"]["Tables"]["todos"]["Row"][]>();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("todos").select();
      console.log("data", data);
      if (data) setTodos(data);
    };

    getData();
  }, [supabase]);

  return (<pre>{JSON.stringify(todos, null, 2)}</pre>)

}
