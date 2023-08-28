import createServerComponentClientWithCookies from "./createServerComponentClientWithCookies";
import { gravatarURL } from "@/lib/utils";

export type User = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  gravatar: string;
};

export default async function getUser() {
  const supabase = await createServerComponentClientWithCookies();

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
