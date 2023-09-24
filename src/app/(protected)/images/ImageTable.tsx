"use client";

import { CustomTable } from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import { suffixFilename } from "@/lib/utils";
import { useAppStore } from "@/state";
import useDeleteImageMutation from "@/supabase/hooks/use-delete-image-mutation";
import useImageQuery from "@/supabase/hooks/use-image-query";
import { useDeleteFiles } from "@/supabase/storage/use-delete-files";
import type { Image } from "@/types/app.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getColumns } from "./columns";

const confirmDelete = (id: string) => ({
  title: "Are you absolutely sure?",
  message: (
    <>
      This will permanently delete <strong>{id}</strong>.
    </>
  ),
});

export default function ImageTable() {
  const { confirm } = useConfirm();
  const router = useRouter();

  const { user } = useAppStore();
  const { data: images } = useImageQuery();
  const { mutate: deleteImage } = useDeleteImageMutation();
  const deleteFiles = useDeleteFiles();

  const UploadAction = () => (
    <Link href="/images/upload" className={buttonVariants({ variant: "default" })}>
      Upload image
    </Link>
  );

  const handleEdit = ({ filename }: Image) => {
    router.push(`/images/edit/${user?.id}?filename=${filename}`);
  };

  const handleDelete = async ({ id, filename }: Image) => {
    if (await confirm(confirmDelete(id))) {
      const { error } = await deleteFiles("images", [
        filename,
        suffixFilename(filename, "-crop"),
        suffixFilename(filename, "-thumbnail"),
      ]);

      if (error) {
        return console.error(error);
      }

      deleteImage(id);
    }
  };

  const columns = getColumns({ onDelete: handleDelete, onEdit: handleEdit });

  return <CustomTable columns={columns} data={images || []} actions={<UploadAction />} />;
}
