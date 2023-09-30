import { useQuery } from "@tanstack/react-query";
import { getImage } from "./queries/get-image";
import { getImageByFilename } from "./queries/get-image-by-filename";
import { getImageByFilenameQuery } from "./queries/get-image-by-filename-query";
import { getImageById } from "./queries/get-image-by-id";
import useSupabase from "./use-supabase";

function useImageQuery() {
  const client = useSupabase();
  const key = ["images"];

  return useQuery(key, async () => {
    return getImage(client).then((result) => result.data);
  });
}

function useImageQueryById(id: string | undefined) {
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

function useImageQueryByFilename(filename: string | undefined) {
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

function useImageQueryByFilenameQuery(filenameQuery: string | undefined) {
  const client = useSupabase();
  // TODO: How to set keys?
  const key = ["image-query", filenameQuery];

  return useQuery(key, async () => {
    return getImageByFilenameQuery(client, filenameQuery as string).then((result) => result.data);
  });
}

export { useImageQuery, useImageQueryByFilename, useImageQueryByFilenameQuery, useImageQueryById };

