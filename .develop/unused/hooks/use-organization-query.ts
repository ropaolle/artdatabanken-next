import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "./get-organization-by-id";
import useSupabase from "./use-supabase";

export default function useOrganizationQuery(organizationId: number) {
  const client = useSupabase();
  const key = ['organization', organizationId];
 
  return useQuery(key, async () => {
    return getOrganizationById(client, organizationId).then(
      (result) => result.data
    );
  });
}