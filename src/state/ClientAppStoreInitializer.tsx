"use client";

import { useAppStore } from "@/state";
import { fetchClientUser } from "@/supabase/client";
import { useEffect } from "react";

export default function ClientAppStoreInitializer() {
  const { setUser } = useAppStore();

  useEffect(() => {
    const loadUser = async () => {
      const { user } = await fetchClientUser();
      setUser(user);
    };

    loadUser();
  }, [setUser]);

  return null;
}
