"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CustomTable from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { getColumns, type Species } from "./columns";

export default function SpeciesTable({ rows, count }: { rows: Species[]; count?: number | null }) {
  const [data, setData] = useState(rows);
  const supabase = createClientComponentClient();
  const { confirm } = useConfirm();

  const handleDelete = async (id: string) => {
    if (
      await confirm({
        title: "Are you absolutely sure?",
        message: (
          <>
            This will permanently delete <strong>{id}</strong>.
          </>
        ),
      })
    ) {
      const { error } = await supabase.from("species").delete().eq("id", id);

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
    </>
  );
}
