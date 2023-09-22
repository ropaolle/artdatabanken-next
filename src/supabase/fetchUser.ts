/**
 * Retrieve a user - https://supabase.com/docs/reference/javascript/auth-getuser
 *
 * NOTE: getSession is faster than getUser, but I am not sure if it is secure or always
 * provide the atest user information.
 *
 * From the Supabase docs: Gets the current user details if there is an existing session.
 * - This method fetches the user object from the database instead of local session.
 * - This method is useful for checking if the user is authorized because it validates the user's
 *   access token JWT on the server.
 * - Should be used only when you require the most current user data. For faster results,
 *   getSession().session.user is recommended.
 */

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as crypto from "crypto";
// import { gravatarURL } from "./utils";

const md5 = (contents: string) => crypto.createHash("md5").update(contents).digest("hex");

const gravatarURL = (email: string) => `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`;

export const fetchUser = async (supabase: SupabaseClient) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUser = session?.user;

  const user = sessionUser
    ? {
        id: sessionUser.id,
        role: sessionUser.role,
        email: sessionUser.email,
        gravatar: gravatarURL(sessionUser.email || ""),
      }
    : null;

  return { user, isAuthenticated: !!user?.id };
};
