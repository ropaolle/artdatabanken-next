import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import type { Image } from "@/types/app.types";
import { createColumnHelper } from "@tanstack/react-table";
import NextImage from "next/image";

type Actions = {
  onDelete?: (id: string) => void;
  onEdit?: (row: Image) => void;
  editPath?: string;
};

const columnHelper = createColumnHelper<Image>();

export function getColumns(actions: Actions) {
  return [
    columnHelper.display(getCheckboxColumn()),

    columnHelper.accessor("id", { header: "Id" }),

    columnHelper.accessor("filename", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Filename" />,
    }),

    // INFO: None string based columns needs an accessory function that returns the string that
    // will be displayd, sorted etc.
    columnHelper.accessor((row) => `${row.crop_width} * ${row.crop_height} px`, {
      id: "crop_width",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Crop resolution" />,
    }),

    columnHelper.accessor((row) => `${row.natural_width} * ${row.natural_height} px`, {
      id: "natural_width",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Org resolution" />,
    }),

    columnHelper.accessor((row) => (row.upscaled ? "True" : "False"), {
      id: "upscaled",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Upscaled" />,
    }),

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
        const url = info.getValue();
        return <NextImage src={url} alt="image" width="100" height="100" loading="lazy" />;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} {...actions} />,
    }),
  ];
}
