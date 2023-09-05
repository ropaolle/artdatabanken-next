import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { Female, Male } from "./icons";
import { type Database } from "@/lib/database.types";

export type Species = Database["public"]["Tables"]["species"]["Row"] & {
  images: { thumbnail_url: string | null } | null;
};

const columnHelper = createColumnHelper<Species>();

export const getColumns = (onDelete: (id: string) => void) => [
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
      const { gender, latin_name } = info.row.original;
      const species = info.getValue() || "";
      return (
        <>
          <div className="flex">
            <span className="text-primary-600 font-bold">{species}</span>
            {gender?.includes("male") && <Male />}
            {gender?.includes("female") && <Female />}
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
