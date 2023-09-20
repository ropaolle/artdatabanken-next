"use client";

import { fetchUser } from "@/lib/supabase";
import { useAppStore } from "@/state";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function AppStoreInitializer() {
  const supabase = createClientComponentClient();
  const {setUser } = useAppStore();

  useEffect(() => {
    const loadUser = async () => {
      setUser(await fetchUser(supabase));
    };

    loadUser();
  },[setUser, supabase]);

  return null;
}
