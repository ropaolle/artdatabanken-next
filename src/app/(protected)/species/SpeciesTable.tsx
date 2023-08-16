"use client";

import { type Database } from "@/lib/database.types";
import Table, { type RowClick, type SelectRow } from "@/components/Table";
import { truncateString } from "@/lib";

type Column = { label: string; field: string };

const columns = [
  // created_at
  // updated_at
  // { label: "Id", field: "id" },
  // { label: "User Id", field: "id" },
  { label: "Kingdom", field: "kingdom" },
  // { label: "Order", field: "taxonomy_order" },
  // { label: "Family", field: "family" },
  { label: "Species", field: "species" },
  { label: "Sex", field: "sex" },
  { label: "County", field: "county" },
  { label: "Place", field: "place" },
  { label: "Latin", field: "latin_name" },
  { label: "Image", field: "image" },
  // { label: "Image ID", field: "image_id" },
];

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesTable({ rows, count }: { rows: Species[]; count?: number }) {
  const handleRowClick = ({ index, row }: RowClick<Species>) => {
    console.log("handleRowClick", index, row);
  };

  const handleSelectRow = ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Species>) => {
    console.log("onSelectRow", selectedIndexes);
  };

  const thumbnail = (url: string, placeholder = "/bird.svg") =>
    url && `<img src="${url?.length > 30 ? url : placeholder}" alt="image" width="100" loading="lazy" />`;

  const parsedRows = rows.map((row) => ({
    ...row,
    image: thumbnail(row.images?.thumbnail_url || ""),
  }));

  return (
    <Table<Column, Species>
      // <Table<Column, typeof parsedRows[0]>
      rows={parsedRows}
      columns={columns}
      onRowClick={handleRowClick}
      onSelectRow={handleSelectRow}
    />
  );
}
