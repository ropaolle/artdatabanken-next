"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CustomTable from "@/components/CustomTable";
import useConfirm from "@/components/useConfirm";
import { getColumns, type Image } from "./columns";

export default function ImageTable({ rows, count }: { rows: Image[]; count?: number | null }) {
  const [data, setData] = useState(rows);

  const supabase = createClientComponentClient();
  const [ConfirmDialog, confirm] = useConfirm();

  const handleDelete = async (id: string) => {
    const confirmMessage = {
      title: "Are you absolutely sure?",
      message: (
        <>
          This action cannot be undone. This will permanently delete <strong>{id}</strong>.
        </>
      ),
    };
    if (await confirm(confirmMessage)) {
      const { error } = await supabase.from("images").delete().eq("id", id);

      if (error) {
        return console.error(error);
      }

      const deletedIndex = data.findIndex((row) => row.id === id);
      if (deletedIndex !== -1) {
        setData((prevValue) => prevValue.splice(deletedIndex, 1) && [...prevValue]);
      }
    }
  };

  return (
    <>
      <CustomTable columns={getColumns(handleDelete)} data={data} />
      <ConfirmDialog />
    </>
  );
}
