import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { gravatarURL } from "./gravatarURL";

export type User = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  gravatar: string;
};

export default async function getUser() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
    ? {
        id: user.id,
        role: user.role,
        email: user.email,
        gravatar: gravatarURL(user.email || ""),
      }
    : null;
}
