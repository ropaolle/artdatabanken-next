"use client";

import CustomTable, { ActionCell, DataTableColumnHeader, getCheckboxColumn } from "@/components/CustomTable";
import { type Database } from "@/lib/database.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import useConfirm from "@/components/useConfirm";

/* {
  id: 'a84965d0-3d59-442f-9774-48c2478936b1',
  created_at: '2023-08-15T13:24:33.683335+00:00',
  updated_at: '2023-08-15T13:24:33.683335+00:00',
  user_id: null,
  filename: 'image00x.jpg',
  url: 'https://image00x.jpg',
  thumbnail_url: 'https://image00x_thumb.jpg'
}, */

type Image = Database["public"]["Tables"]["images"]["Row"];

export default function ImageTable({ rows }: { rows: Image[] }) {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you absolutely sure?",
    message:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  });

  const handleDelete = async (id: string) => {
    if (await confirm()) {
      console.log("id", id);
    }
  };

  const columns: ColumnDef<Image>[] = [
    {
      ...getCheckboxColumn(),
    },
    {
      accessorKey: "filename",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Filename" />,
    },
    {
      accessorKey: "url",
      header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
      cell: ({ row }) => {
        const url = row.getValue<string | null>("url") || "";
        return <div className="text-right font-medium">{url.length > 30 ? url.slice(0, 19) : url}</div>;
      },
    },
    { accessorKey: "thumbnail_url", header: "Thumbnail URL" },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => {
        const url = row.getValue<string | null>("thumbnail_url") || "";
        return (
          <div className="text-right font-medium">
            {url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <b>Actions</b>,
      cell: ({ row }) => <ActionCell row={row} onDelete={handleDelete} />,
    },
  ];

  return (
    <>
      <div className="container mx-auto py-10">{rows && <CustomTable columns={columns} data={rows} />}</div>
      <ConfirmDialog />
    </>
  );
}
