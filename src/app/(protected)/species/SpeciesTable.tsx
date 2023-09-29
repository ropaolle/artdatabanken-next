"use client";

import { CustomTable } from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import useDeleteSpeciesMutation from "@/supabase/database/use-delete-species-mutation";
import useSpeciesQuery from "@/supabase/database/use-species-query";
import { Species } from "@/types/app.types";
import Link from "next/link";
import { getColumns } from "./columns";

const confirmDelete = (id: string) => ({
  title: "Are you absolutely sure?",
  message: (
    <>
      This will permanently delete <strong>{id}</strong>.
    </>
  ),
});

export default function SpeciesTable() {
  const { confirm } = useConfirm();
  const { data: species } = useSpeciesQuery();
  const { mutate: deleteSpecies } = useDeleteSpeciesMutation();

  const handleDelete = async (species: Species) => {
    if (await confirm(confirmDelete(species.id))) {
      deleteSpecies({ id: species.id, brodcastMessage: species });
    }
  };

  const AddSpeciesAction = () => (
    <Link href="/species/add" className={buttonVariants({ variant: "default" })}>
      AddSpecies
    </Link>
  );

  const columns = getColumns({ onDelete: handleDelete, editPath: "/species/edit/" });

  return (
    <>
      <CustomTable columns={columns} data={species || []} actions={<AddSpeciesAction />} />
    </>
  );
}
