"use client";

import { type Database } from "@/lib/database.types";
import Table, { type RowClick, type SelectRow } from "@/components/Table";
import { truncateString } from "@/lib";

const female = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
    <path
      fill="currentColor"
      d="M11 14.9q-1.975-.35-3.238-1.888T6.5 9.45q0-2.275 1.613-3.862T12 4q2.275 0 3.888 1.588T17.5 9.45q0 2.025-1.263 3.563T13 14.9V17h1q.425 0 .713.288T15 18q0 .425-.288.713T14 19h-1v1q0 .425-.288.713T12 21q-.425 0-.713-.288T11 20v-1h-1q-.425 0-.713-.288T9 18q0-.425.288-.713T10 17h1v-2.1Zm1-1.9q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13Z"
    />
  </svg>`;

const male = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
    <path
      fill="currentColor"
      d="M20 4v6h-2V7.425l-3.975 3.95q.475.7.725 1.488T15 14.5q0 2.3-1.6 3.9T9.5 20q-2.3 0-3.9-1.6T4 14.5q0-2.3 1.6-3.9T9.5 9q.825 0 1.625.237t1.475.738L16.575 6H14V4h6ZM9.5 11q-1.45 0-2.475 1.025T6 14.5q0 1.45 1.025 2.475T9.5 18q1.45 0 2.475-1.025T13 14.5q0-1.45-1.025-2.475T9.5 11Z"
    />
  </svg>`;

type Column = { label: string; field: string };

const columns = [
  // created_at
  // updated_at
  // { label: "Id", field: "id" },
  // { label: "User Id", field: "id" },
  // { label: "Kingdom", field: "kingdom" },
  // { label: "Order", field: "taxonomy_order" },
  { label: "Family", field: "family" },
  { label: "Species", field: "species" },
  // { label: "Sex", field: "sex" },
  { label: "County", field: "county" },
  { label: "Place", field: "place" },
  // { label: "Latin", field: "latin_name" },
  { label: "Image", field: "image" },
  // { label: "Image ID", field: "image_id" },
  { label: "Actions", field: "actions" },
];

type Species = Database["public"]["Tables"]["species"]["Row"];

const sexIcon = (sex: string | null) => {
  switch (sex) {
    case "male":
      return male;
    case "female":
      return female;
    case "both":
      return male + female;
    default:
      return "";
  }
};

export default function SpeciesTable({ rows, count }: { rows: Species[]; count?: number }) {
  const handleRowClick = ({ index, row }: RowClick<Species>) => {
    console.log("handleRowClick", index, row);
  };

  const handleSelectRow = ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Species>) => {
    console.log("onSelectRow", selectedIndexes);
  };

  const thumbnail = (url: string, placeholder = "/bird.svg") =>
    url && `<img src="${url?.length > 30 ? url : placeholder}" alt="image" width="100" loading="lazy" />`;

  const parsedRows = rows.map((row, i) => ({
    ...row,
    family: `
      <div class="font-bold">${row.family}</div>      
      <div class="text-xs mt-2 text-neutral-600"><span class="font-bold">Kingdom: </span>${row.kingdom}</div>
      <div class="text-xs mt-1 text-neutral-600" ><span class="font-bold">Order: </span>${row.taxonomy_order}</div>
    `,
    species: `
      <div class="flex"><span class="font-bold text-primary-600">${row.species}</span>${sexIcon(row.sex)}</div>
      <div class="text-sm mt-2 text-neutral-600">${row.latin_name}</div>
    `,
    image: thumbnail(row.images?.thumbnail_url || ""),
    actions: `
      <div class="flex">        
        <a role="button" class="delete-email-button text-neutral-300 ms-2" data-te-index="${i}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </a>
      </div>`,
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
