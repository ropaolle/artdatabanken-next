"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { gravatarURL } from "@/lib/gravatarURL";

export type User = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  gravatar: string;
};

export default function useAuth() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      user &&
        setUser({
          id: user.id,
          role: user.role,
          email: user.email,
          gravatar: gravatarURL(user.email || ""),
        });
    };

    getUser();
  }, [supabase.auth]);

  return user;
}
