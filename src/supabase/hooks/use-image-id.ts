import { useMutation, useQuery } from "@tanstack/react-query";
import { getImageId } from "./get-image-id";
import useSupabase from "./use-supabase";

export default function useImageId(userId: string | undefined, filename: string | undefined) {
  const client = useSupabase();
  const key = ["images", filename];

  return useQuery(key, async () => {
    if (!userId || !filename) return;
    return getImageId(client, userId, filename).then((result) => result.data);
  }, {enabled: !!userId && !!filename});
}

// export default function useImageId() {
//   const client = useSupabase();

//   return useMutation(async ({ id, filename }: { id?: string; filename?: string }) => {
//     return id && filename ? getImageId(client, id, filename).then((result) => result.data) : null;
//   });
// }
