// import { useQuery } from "@tanstack/react-query";
// import { getSpecies } from "./get-species";
// import useSupabase from "./use-supabase";
// import { deleteSpeciesById } from "./delete-species-by-id";

// export default function useSpeciesQuery(id?: string, action?: string) {
//   const client = useSupabase();
//   const key = ["species"];

//   return useQuery(key, async () => {
//     if (action === "delete" && id) {
//       return deleteSpeciesById(client, id).then((result) => result.data);
//     }
//     return getSpecies(client).then((result) => result.data);
//   });
// }

import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;