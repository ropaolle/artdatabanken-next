"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { type Database } from "@/lib/database.types";

type Actions = {
  onDelete?: (id: string) => void;
  editPath?: string;
};

// export type Image = Database["public"]["Tables"]["images"]["Row"];
export type Image = Tables<"images">;

const columnHelper = createColumnHelper<Species>();

export function getColumns(actions: Actions) {
  return [
    columnHelper.display(getCheckboxColumn()),

    columnHelper.accessor("id", { header: "Id" }),

    columnHelper.accessor("filename", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Filename" />,
    }),

    columnHelper.accessor("crop_width", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Crop resolution" />,
      cell: ({ row }) => {
        const { crop_width, crop_height } = row.original;
        return `${crop_width} * ${crop_height} px`;
      },
    }),

    columnHelper.accessor("natural_width", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Org resolution" />,
      cell: ({ row }) => {
        const { natural_width, natural_height } = row.original;
        return `${natural_width} * ${natural_height} px`;
      },
    }),

    columnHelper.accessor("upscaled", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Upscaled" />,
    }),

    // columnHelper.accessor("mime_type", {
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Mime type" />,
    // }),

    columnHelper.accessor("created_at", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),

    columnHelper.accessor("updated_at", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),

    columnHelper.accessor("thumbnail_url", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thumbnail" />,
      cell: (info) => {
        const url = info.getValue<string>();
        return (
          <div>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</div>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} {...actions} />,
    }),
  ];
}
