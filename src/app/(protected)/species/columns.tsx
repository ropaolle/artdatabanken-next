"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

import { type Database } from "@/lib/database.types";
import { Female, Male, Pencil, Trash } from "./icons";

export type Species = Database["public"]["Tables"]["species"]["Row"];

const image = (url = "") => (
  <>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</>
);

const actions = (id: string) => (
  <div className="flex justify-end">
    <a role="button" title="Delete" className="delete-button ms-2 text-neutral-300" data-te-index={id}>
      <Trash />
    </a>

    <a role="button" title="Edit" className="edit-button ms-2 text-neutral-300" data-te-index={id}>
      <Pencil />
    </a>
  </div>
);

export const columns: ColumnDef<Species>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // { header: "User Id", accessorKey: "id" },
  {
    // header: "Family",
    accessorKey: "family",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Family
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    // header: "Species",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Species
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "species",
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
  { header: "County", accessorKey: "county" },
  { header: "Place", accessorKey: "place" },
  {
    header: "Thumbnail",
    accessorKey: "images",
    cell: ({ row }) => {
      const { thumbnail_url } = row.getValue<{ thumbnail_url: string } | null>("images") || {};
      return <div className="text-right font-medium">{image(thumbnail_url)}</div>;
    },
  },
  {
    // id: "actions",
    header: () => <b>Actions</b>,
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      return <>{actions(id)}</>;
    },
  },
];
