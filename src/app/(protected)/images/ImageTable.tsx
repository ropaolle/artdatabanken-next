"use client";

import { type Database } from "@/lib/database.types";
import { Table, type RowClick, type SelectRow } from "@/components/Table";
import { truncateString } from "@/lib";

type Column = { label: string; field: string };

const columns = [
  // created_at
  // updated_at
  // { label: "Id", field: "id" },
  // { label: "User Id", field: "id" },
  { label: "Filename", field: "filename" },
  { label: "URL", field: "url" },
  { label: "Thumbnail URL", field: "thumbnail_url" },
  { label: "Image", field: "image" },
];

type Image = Database["public"]["Tables"]["images"]["Row"];

export default function ImageTable({ rows, count }: { rows: Image[]; count: number }) {
  const handleRowClick = ({ index, row }: RowClick<Image>) => {
    console.log("handleRowClick", index, row);
  };

  const handleSelectRow = ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Image>) => {
    console.log("onSelectRow", selectedIndexes);
  };

  const thumbnail = (url: string | null, placeholder = "/bird.svg") =>
    url && `<img src="${url?.length > 30 ? url : placeholder}" alt="image" width="100" loading="lazy" />`;

  const parsedRows = rows.map((row) => ({
    ...row,
    url: `<div class="h-24">${truncateString(row.url, 36)}</div>`,
    thumbnail_url: `<div class="h-24">${truncateString(row.thumbnail_url, 36)}</div>`,
    // thumbnail_url: thumbnail(row?.thumbnail_url),
    image: thumbnail(row?.thumbnail_url),
  }));

  return (
    <Table<Column, Image>
      rows={parsedRows}
      columns={columns}
      onRowClick={handleRowClick}
      onSelectRow={handleSelectRow}
    />
  );
}
