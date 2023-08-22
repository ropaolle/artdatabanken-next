"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { type Database } from "@/lib/database.types";
import { Female, Male, Trash, Pencil } from "./icons";

export type Species = Database["public"]["Tables"]["species"]["Row"];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const image = (url = "") => (
  <>{url && url.length > 30 && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</>
);

const actions = (id: string) => (
  <div className="flex justify-end">
    <a role="button" title="Delete" className="delete-button ms-2 text-neutral-300" data-te-index={id}>
      <Trash />
    </a>

    <a role="button" title="Edit" className="edit-button ms-2 text-neutral-300" data-te-index={id}>
      <Pencil />
    </a>
  </div>
);

export const columns: ColumnDef<Species>[] = [
  // { header: "User Id", accessorKey: "id" },
  {
    header: "Family",
    accessorKey: "family",
    cell: ({ row }) => {
      const { family, kingdom, taxonomy_order: order } = row.original;
      // const family = row.getValue<string | null>("family") || "";
      // const kingdom = row.getValue<string | null>("kingdom") || "";
      // const order = row.getValue<string | null>("taxonomy_order") || "";
      return (
        <>
          <div className="font-bold">{family}</div>
          <div>Kingdom: {kingdom}</div>
          <div className="text-sm">Order: {order}</div>
        </>
      );
    },
  },
  {
    header: "Species",
    accessorKey: "species",
    cell: ({ row }) => {
      // TODO: row.original overrides cache, use columnHelper and grouping instead
      // console.log('row._valuesCache', row._valuesCache);
      const species = row.getValue<string | null>("species") || "";
      const { /* species,  */ sex, latin_name } = row.original;
      return (
        <>
          <div className="flex">
            <span className="text-primary-600 font-bold">{species}</span>
            {sex === "male" && <Male />}
            {sex === "female" && <Female />}
            {sex === "both" && (
              <>
                <Male />
                <Female />
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-neutral-600">{latin_name}</div>
        </>
      );
    },
  },
  { header: "County", accessorKey: "county" },
  { header: "Place", accessorKey: "place" },
  {
    header: "Thumbnail",
    accessorKey: "images",
    cell: ({ row }) => {
      const { thumbnail_url } = row.getValue<{ thumbnail_url: string } | null>("images") || {};
      return <div className="text-right font-medium">{image(thumbnail_url)}</div>;
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      return <>{actions(id)}</>;
    },
  },
];

export default function SpeciesTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
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
