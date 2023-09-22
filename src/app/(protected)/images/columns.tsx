import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import type { Image } from "@/types/app.types";
import { createColumnHelper } from "@tanstack/react-table";
import NextImage from "next/image";

type Actions = {
  onDelete?: (id: string) => void;
  onEdit?: (row: Image) => Promise<void> | void;
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

    // TODO: Don't work, none string based value
    // columnHelper.accessor("crop_width", {
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Crop resolution" />,
    //   cell: ({ row }) => {
    //     const { crop_width, crop_height } = row.original;
    //     return `${crop_width} * ${crop_height} px`;
    //   },
    // }),

    // TODO: Don't work, none string based value
    // columnHelper.accessor("natural_width", {
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Org resolution" />,
    //   cell: ({ row }) => {
    //     const { natural_width, natural_height } = row.original;
    //     return `${natural_width} * ${natural_height} px`;
    //   },
    // }),

    // TODO: Don't work
    // columnHelper.accessor("upscaled", {
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Upscaled" />,
    // }),

    // columnHelper.accessor((row) => row.upscaled, {
    //   id: "upscaled",
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Upscaled" />,
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
