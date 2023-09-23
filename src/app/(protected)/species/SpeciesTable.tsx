"use client";

import { CustomTable } from "@/components/CustomTable";
import useConfirm from "@/components/hooks/useConfirm";
import { buttonVariants } from "@/components/ui/button";
import useSpeciesQuery from "@/supabase/hooks/use-species-query";
import useSupabase from "@/supabase/hooks/use-supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const client = useSupabase();
  const queryClient = useQueryClient();
  const { data: species /* , isLoading, isError */ } = useSpeciesQuery();

  const deleteSpecies = useMutation({
    mutationFn: async (id: string) => await client.from("species").delete().eq("id", id).throwOnError(),
    onSuccess: () => {
      queryClient.invalidateQueries(["species"]);
    },
    onError: (error) => console.error(error),
  });

  const handleDelete = async (id: string) => {
    if (await confirm(confirmDelete(id))) {
      deleteSpecies.mutate(id);
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
