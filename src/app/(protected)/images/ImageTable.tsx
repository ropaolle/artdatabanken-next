"use client";

import CustomTable from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { getColumns, type Image } from "./columns";

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

  const handleDelete = async (id: string) => {
    if (await confirm(confirmDelete(id))) {
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

  console.log('count', count);
  console.log('rows', data);

  return (
    <>
      <CustomTable columns={getColumns(handleDelete)} data={data} />
    </>
  );
}
