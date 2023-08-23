"use client";

import { type Database } from "@/lib/database.types";
import { ColumnDef /* , createColumnHelper */ } from "@tanstack/react-table";
import Image from "next/image";
import { getCheckboxColumn, ActionCell, DataTableColumnHeader } from "@/components/CustomTable";

export type Image = Database["public"]["Tables"]["images"]["Row"];

// const columnHelper = createColumnHelper<Image>();

/* {
  id: 'a84965d0-3d59-442f-9774-48c2478936b1',
  created_at: '2023-08-15T13:24:33.683335+00:00',
  updated_at: '2023-08-15T13:24:33.683335+00:00',
  user_id: null,
  filename: 'image00x.jpg',
  url: 'https://image00x.jpg',
  thumbnail_url: 'https://image00x_thumb.jpg'
}, */

const image = (url = "") => (
  <>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</>
);

export const columns: ColumnDef<Image>[] = [
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
      return <div className="text-right font-medium">{image(url)}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <b>Actions</b>,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

// TODO: use columnHelper
// https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers
/* export const columns = [
  columnHelper.accessor(row => row.url, {
    id: 'url',
    cell: (v) => {
      const url = v.getValue()
      return <div className="text-right font-medium">{url}</div>;
    },
    // header: () => <span>Last Name</span>,
    // footer: props => props.column.id,
  }),
]; */
