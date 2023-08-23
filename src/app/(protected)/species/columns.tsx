"use client";

import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/database.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Female, Male } from "./icons";

export type Species = Database["public"]["Tables"]["species"]["Row"];

const image = (url = "") => (
  <>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</>
);

export const columns: ColumnDef<Species>[] = [
  {
    ...getCheckboxColumn(),
  },
  {
    accessorKey: "family",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Family" />,
    cell: ({ row }) => {
      const { family, kingdom, taxonomy_order: order } = row.original;
      // const family = row.getValue<string | null>("family") || "";
      // const kingdom = row.getValue<string | null>("kingdom") || "";
      // const order = row.getValue<string | null>("taxonomy_order") || "";
      return (
        <>
          <div className="font-bold">{family}</div>
          <div>Kingdom: {kingdom}</div>
          <div className="text-sm">Order: {order}</div>
        </>
      );
    },
  },
  {
    accessorKey: "species",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Species
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // TODO: row.original overrides cache, use columnHelper and grouping instead
      // console.log('row._valuesCache', row._valuesCache);
      const species = row.getValue<string | null>("species") || "";
      const { /* species,  */ sex, latin_name } = row.original;
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
  },
  { accessorKey: "county", header: "County" },
  { accessorKey: "place", header: "Place" },
  {
    accessorKey: "images",
    header: "Thumbnail",
    cell: ({ row }) => {
      const { thumbnail_url } = row.getValue<{ thumbnail_url: string } | null>("images") || {};
      return <div className="text-right font-medium">{image(thumbnail_url)}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <b>Actions</b>,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
