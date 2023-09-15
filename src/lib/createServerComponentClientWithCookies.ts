// TODO: DynamicServerError: Dynamic server usage: Page couldn't be rendered statically because it used `cookies`.
// [See more info here](https://nextjs.org/docs/messages/dynamic-server-error)

import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

async function getCookieData(): Promise<ReadonlyRequestCookies> {
  const cookieData = cookies();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000),
  );
}

export default async function createServerComponentClientWithCookies() {
  const tempCookies = await getCookieData();
  return createServerComponentClient<Database>({ cookies: () => tempCookies });
}
