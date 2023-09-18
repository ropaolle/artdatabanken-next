"use client";

import CustomTable from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import type { Image } from "@/types/app.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getColumns } from "./columns";

const confirmDelete = (id: string) => ({
  title: "Are you absolutely sure?",
  message: (
    <>
      This will permanently delete <strong>{id}</strong>.
    </>
  ),
});

export default function ImageTable({ rows, count }: { rows: Image[]; count?: number }) {
  const [data, setData] = useState(rows);
  const supabase = createClientComponentClient();
  const { confirm } = useConfirm();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (await confirm(confirmDelete(id))) {
      // Delete db record
      const { error } = await supabase.from("images").delete().eq("id", id);

      // Delete image files
      const { filename } = data.find((row) => row.id === id) || {};
      if (filename) {
        await supabase.storage
          .from("images")
          .remove([`originals/${filename}`, `crops/${filename}`, `thumbnails/${filename}`]);
      }

      // Remove from table
      const deletedIndex = data.findIndex((row) => row.id === id);
      if (deletedIndex !== -1) {
        setData((prevValue) => prevValue.splice(deletedIndex, 1) && [...prevValue]);
      }
    }
  };

  const handleEdit = ({ id, filename }: Image) => {
    router.push(`/images/edit/${id}?filename=${filename}`);
  };

  const UploadAction = () => (
    <Link href="/images/upload" className={buttonVariants({ variant: "default" })}>
      Upload image
    </Link>
  );

  return (
    <CustomTable
      columns={getColumns({ onDelete: handleDelete, onEdit: handleEdit })}
      data={data}
      actions={<UploadAction />}
    />
  );
}
