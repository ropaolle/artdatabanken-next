"use client";

import CustomTable from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import type { SpeciesImage } from "@/types/app.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
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

export default function SpeciesTable({ rows, count }: { rows: SpeciesImage[]; count?: number | null }) {
  const [data, setData] = useState(rows);
  const supabase = createClientComponentClient();
  const { confirm } = useConfirm();

  const handleDelete = async (id: string) => {
    if (await confirm(confirmDelete(id))) {
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

  const AddSpeciesAction = () => (
    <Link href="/species/add" className={buttonVariants({ variant: "default" })}>
      AddSpecies
    </Link>
  );

  return (
    <>
      <CustomTable
        columns={getColumns({ onDelete: handleDelete, editPath: "/species/edit/" })}
        data={data}
        actions={<AddSpeciesAction />}
      />
    </>
  );
}
