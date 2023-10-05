"use client";

import { CustomTable } from "@/components/CustomTable";
import suffixFilename from "@/components/forms/ImageForm/suffixFilename";
import { buttonVariants } from "@/components/ui/button";
import useConfirm from "@/hooks/useConfirm";
import { useDeleteImageMutation, useImageQuery } from "@/supabase/database";
import { useDeleteFiles } from "@/supabase/storage";
import type { Image } from "@/types/app.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
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
  const { data: images } = useImageQuery();
  const { mutate: deleteImage } = useDeleteImageMutation();
  const deleteFiles = useDeleteFiles();

  const UploadAction = () => (
    <Link href="/images/upload" className={buttonVariants({ variant: "default" })}>
      Upload image
    </Link>
  );

  const deleteImages = useCallback(
    (images: { id: string; filename: string }[]) => {
      for (const { id, filename } of images) {
        deleteImage(id, {
          onSuccess: async () => {
            const { error, data } = await deleteFiles("images", [
              filename,
              suffixFilename(filename, "-crop"),
              suffixFilename(filename, "-thumbnail"),
            ]);
          },
        });
      }
    },
    [deleteImage, deleteFiles],
  );

  const handleRowSelectionAction = async (selected: Image[]) => {
    deleteImages(selected);
  };

  const columns = useMemo(() => {
    const handleEdit = ({ /* id,  */ filename }: Image) => {
      // router.push(`/images/edit/${user?.id}?filename=${filename}&id=${id}`);
      router.push(`/images/edit?filename=${filename}`);
    };

    const handleDelete = async ({ id, filename }: Image) => {
      if (await confirm(confirmDelete(id))) {
        deleteImages([{ id, filename }]);
      }
    };

    return getColumns({ onDelete: handleDelete, onEdit: handleEdit });
  }, [router, confirm, deleteImages]);

  return (
    <CustomTable
      columns={columns}
      data={images || []}
      onRowSelectionActionClick={handleRowSelectionAction}
      actions={
        <>
          <UploadAction />
        </>
      }
    />
  );
}
