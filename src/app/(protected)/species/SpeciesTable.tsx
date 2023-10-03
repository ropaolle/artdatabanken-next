"use client";

import { CustomTable } from "@/components/CustomTable";
import useConfirm from "@/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import { useDeleteSpeciesMutation, useSpeciesQuery } from "@/supabase/database";
import { Species } from "@/types/app.types";
import Link from "next/link";
import { getColumns } from "./columns";
import { useMemo } from "react";

const confirmDelete = (id: string) => ({
  title: "Are you absolutely sure?",
  message: (
    <>
      This will permanently delete <strong>{id}</strong>.
    </>
  ),
});

const AddSpeciesAction = () => (
  <Link href="/species/add" className={buttonVariants({ variant: "default" })}>
    AddSpecies
  </Link>
);

export default function SpeciesTable() {
  const { confirm } = useConfirm();
  const { data: species } = useSpeciesQuery();
  const { mutate: deleteSpecies } = useDeleteSpeciesMutation();

  const handleDelete = async (species: Species) => {
    if (await confirm(confirmDelete(species.id))) {
      deleteSpecies({ id: species.id, brodcastMessage: species });
    }
  };

  const columns = getColumns({ onDelete: handleDelete, editPath: "/species/edit/" });

  return (
    <>
      <CustomTable columns={columns} data={species || []} actions={<AddSpeciesAction />} />
    </>
  );
}
