import { ActionCell, DataTableColumnHeader, getCheckboxColumn, type Actions } from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import type { SpeciesImage } from "@/types/app.types";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Female, Male } from "./icons";

const columnHelper = createColumnHelper<SpeciesImage>();

export const getColumns = (actions: Actions<SpeciesImage>) => {
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

    // INFO: Nested keys like 'image.thumbnail' that can be null will show the Console warning - "thumbnail_url"
    // in deeply nested key "image.thumbnail_url" returned undefined.
    columnHelper.accessor("image", {
      header: "Thumbnail",
      cell: (info) => {
        const { thumbnail_url } = info.getValue() || {};
        return (
          thumbnail_url && (
            // INFO: Please add the "priority" property if this image is above the fold. Read more:
            // https://nextjs.org/docs/api-reference/next/image#priority
            <Image src={thumbnail_url} alt="image" width="100" height="100" /* priority={true}  *//>
          )
        );
      },
    }),

    columnHelper.accessor("date", { header: "Date" }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} {...actions} />,
    }),
  ];
};
