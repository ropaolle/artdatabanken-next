import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser } from "./fetchUser";

export const fetchClientUser = () => fetchUser(createClientComponentClient());
