import { useQuery } from "@tanstack/react-query";
import { getImage } from "./get-image";
import useSupabase from "./use-supabase";
import { getImageById } from "./get-image-by-id";
import { getImageByFilename } from "./get-image-by-filename";
import { getImageByFilenameQuery } from "./get-image-by-filename-query";

export default function useImageQuery() {
  const client = useSupabase();
  const key = ["images"];

  return useQuery(key, async () => {
    return getImage(client).then((result) => result.data);
  });
}

export function useImageQueryById(id: string | undefined) {
  const client = useSupabase();
  const key = ["image", id];

  return useQuery(
    key,
    async () => {
      return getImageById(client, id as string).then((result) => result.data);
    },
    { enabled: !!id },
  );
}

export function useImageQueryByFilename(filename: string | undefined) {
  const client = useSupabase();
  const key = ["image", filename];

  return useQuery(
    key,
    async () => {
      return getImageByFilename(client, filename as string).then((result) => result.data);
    },
    { enabled: !!filename },
  );
}

export function useImageQueryByFilenameQuery(filenameQuery: string | undefined) {
  const client = useSupabase();
  // TODO: How to set keys?
  const key = ["image-query", filenameQuery];

  return useQuery(key, async () => {
    return getImageByFilenameQuery(client, filenameQuery as string).then((result) => result.data);
  });
}
