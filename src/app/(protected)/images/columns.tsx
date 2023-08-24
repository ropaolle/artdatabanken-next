import { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { type Database } from "@/lib/database.types";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

/* {
  id: 'a84965d0-3d59-442f-9774-48c2478936b1',
  created_at: '2023-08-15T13:24:33.683335+00:00',
  updated_at: '2023-08-15T13:24:33.683335+00:00',
  user_id: null,
  filename: 'image00x.jpg',
  url: 'https://image00x.jpg',
  thumbnail_url: 'https://image00x_thumb.jpg'
}, */

export type Image = Database["public"]["Tables"]["images"]["Row"];

const columnHelper = createColumnHelper<Image>();

export function getColumns(onDelete: (id: string) => void) {
  return [
    columnHelper.display(getCheckboxColumn()),

    columnHelper.accessor("id", { header: "Id" }),

    columnHelper.accessor("filename", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Filename" />,
    }),

    columnHelper.accessor("url", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
      cell: (info) => {
        const url = info.getValue();
        return <div className="text-right font-medium">{url && url?.length > 30 ? url?.slice(0, 19) : url}</div>;
      },
    }),

    columnHelper.accessor("thumbnail_url", { header: "Thumbnail URL" }),

    columnHelper.display({
      id: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => {
        const url = row.getValue<string | null>("url");
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
}
