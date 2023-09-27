import Link from "next/link";
import { Bird } from "./Bird";
import MainMenu from "./MainMenu";
import UserMenu from "./UserMenu";
import { fetchServerUser } from "@/supabase/fetchServerUser";

export default async function Header() {
  const { user, isAuthenticated } = await fetchServerUser();

  return (
    <header className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex">
          <Link
            className="ml-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            href="/"
          >
            <Bird className="h-5 w-5" />
            <span className=" mx-2 font-bold text-neutral-600 dark:text-neutral-200">Artdatabanken</span>
          </Link>
          <MainMenu isAuthenticated={isAuthenticated} />
        </div>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
