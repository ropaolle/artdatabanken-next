import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import type { SpeciesImage } from "@/types/app.types";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Female, Male } from "./icons";

type Actions = {
  onDelete?: (id: string) => void;
  editPath?: string;
};

const columnHelper = createColumnHelper<SpeciesImage>();

export const getColumns = (actions: Actions) => {
  return [
    columnHelper.display(getCheckboxColumn()),

    columnHelper.accessor("id", { header: "Id" }),

    columnHelper.accessor("family", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Family" />,
      cell: ({ row }) => {
        const { family, kingdom, order: order } = row.original;
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
        // console.info('row._valuesCache', row._valuesCache);
        const { gender, latin } = info.row.original;
        const species = info.getValue() || "";
        return (
          <>
            <div className="flex">
              <span className="text-primary-600 font-bold">{species}</span>
              {gender?.includes("male") && <Male />}
              {gender?.includes("female") && <Female />}
            </div>
            <div className="mt-2 text-sm text-neutral-600">{latin}</div>
          </>
        );
      },
    }),

    columnHelper.accessor("county", { header: "County" }),

    columnHelper.accessor("place", { header: "Place" }),

    // TODO: image can be null
    columnHelper.accessor("image.thumbnail_url", {
      header: "Thumbnail",
      cell: (info) => {
        const url = info.getValue();
        return <div>{url && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</div>;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} {...actions} />,
    }),
  ];
};
