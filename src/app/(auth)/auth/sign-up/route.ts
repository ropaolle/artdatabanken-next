import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

const getGravatarURL = (email: string) => {
  const md5 = (contents: string) => createHash("md5").update(contents).digest("hex");
  return `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`;
};

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: { gravatar: getGravatarURL(email || "") },
    },
  });

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=Could not authenticate user`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(`${requestUrl.origin}/login?message=Check email to continue sign in process`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
