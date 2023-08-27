"use client";

import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/database.types";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import CustomTable, { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { Female, Male } from "./icons";
import useConfirm from "@/components/useConfirm";

export type Species = Database["public"]["Tables"]["species"]["Row"];

const columnHelper = createColumnHelper<Species>();

const getColumns = (onDelete: (id: string) => void) => [
  columnHelper.display(getCheckboxColumn()),

  columnHelper.accessor("id", { header: "Id" }),

  columnHelper.accessor("family", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Family" />,
    cell: ({ row }) => {
      const { family, kingdom, taxonomy_order: order } = row.original;
      return (
        <>
          <div className="font-bold">{family}</div>
          <div>Kingdom: {kingdom}</div>
          <div className="text-sm">Order: {order}</div>
        </>
      );
    },
  }),

  columnHelper.accessor("species", {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Species
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      // TODO: row.original overrides cache, use columnHelper and grouping instead
      // console.log('row._valuesCache', row._valuesCache);
      const { sex, latin_name } = info.row.original;
      const species = info.getValue() || "";
      return (
        <>
          <div className="flex">
            <span className="text-primary-600 font-bold">{species}</span>
            {sex === "male" && <Male />}
            {sex === "female" && <Female />}
            {sex === "both" && (
              <>
                <Male />
                <Female />
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-neutral-600">{latin_name}</div>
        </>
      );
    },
  }),

  columnHelper.accessor("county", { header: "County" }),

  columnHelper.accessor("place", { header: "Place" }),

  columnHelper.accessor("images.thumbnail_url", {
    header: "Thumbnail",
    cell: (info) => {
      const url = info.getValue();
      return (
        <div>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</div>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell row={row} onDelete={onDelete} />,
  }),
];

export default function SpeciesTable({ rows }: { rows: Species[] | null }) {
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
      console.info("id", id);
    }
  };

  return (
    <>
      <div className="container mx-auto py-10">
        {rows && <CustomTable columns={getColumns(handleDelete)} data={rows} />}
      </div>
      <ConfirmDialog />
    </>
  );
}
