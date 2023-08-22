"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { type Database } from "@/lib/database.types";
// import { truncateString } from "@/lib";

export type Image = Database["public"]["Tables"]["images"]["Row"];

// export type Image = {
//   // created_at: string;
//   filename: string | null;
//   id: string;
//   thumbnail_url: string | null;
//   // updated_at: string;
//   url: string | null;
//   // user_id: string | null;
// };

const columnHelper = createColumnHelper<Image>();

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
  // { header: "User Id", accessorKey: "id" },
  { header: "Filename", accessorKey: "filename" },
  {
    header: "URL",
    accessorKey: "url",
    cell: ({ row }) => {
      const url = row.getValue<string | null>("url") || "";
      return <div className="text-right font-medium">{url.length > 30 ? url.slice(0, 19) : url}</div>;
    },
  },
  { header: "Thumbnail URL", accessorKey: "thumbnail_url" },
  {
    header: "Thumbnail",
    accessorKey: "thumbnail",
    cell: ({ row }) => {
      const url = row.getValue<string | null>("thumbnail_url") || "";
      return <div className="text-right font-medium">{image(url)}</div>;
    },
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

export default function ImageTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
