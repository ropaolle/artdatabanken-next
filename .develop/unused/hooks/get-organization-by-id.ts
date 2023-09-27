import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getOrganizationById(client: SupabaseClient, organizationId: number) {
  return client
    .from("organizations")
    .select(
      `
      id,
      name
    `,
    )
    .eq("id", organizationId)
    .throwOnError()
    .single();
}
