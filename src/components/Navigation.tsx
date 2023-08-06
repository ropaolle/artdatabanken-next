import Link from "next/link";
import { type User } from "@supabase/supabase-js";
import { LogoutButton } from ".";

type Props = {
  user: User | null;
};

export default function Navigation({ user }: Props) {
  return (
    <nav className="">
      <div>
        {user ? (
          <div className="">
            Hey, {user.email}!
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login" className="">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
