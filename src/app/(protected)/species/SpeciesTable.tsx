"use client";

import { type Database } from "@/lib/database.types";
import Table, { type RowClick, type SelectRow } from "@/components/Table";
import { truncateString } from "@/lib";
import { renderToStaticMarkup } from "react-dom/server";
import useEvent from "@/components/useEvent";
import { Female, Male, Trash, Pencil } from "./svgs";

const buttons = (index: number) => (
  <div className="flex justify-end">
    <a role="button" className="delete-button text-neutral-300 ms-2" data-te-index={index}>
      <Trash />
    </a>
    <a role="button" className="edit-button text-neutral-300 ms-2" data-te-index={index}>
      <Pencil />
    </a>
  </div>
);

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

const genderIcon = (gender: string | null) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    case "both":
      return (
        <>
          <Male />
          <Female />
        </>
      );
    default:
      return <></>;
  }
};

export default function SpeciesTable({ rows, count }: { rows: Species[]; count?: number }) {
  const setupButtons = (action: string) => {
    document.querySelectorAll(`.${action}-button`).forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = Number(button.getAttribute("data-te-index"));
        console.log(`${action} message: ${index}`, rows?.[index].id);
      });
    });
  };

  useEvent("render.te.datatable", () => {
    setupButtons("delete");
    setupButtons("edit");
  });

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
      <div class="flex"><span class="font-bold text-primary-600">${row.species}</span>${renderToStaticMarkup(
      genderIcon(row.sex)
    )}</div>
      <div class="text-sm mt-2 text-neutral-600">${row.latin_name}</div>
    `,
    image: thumbnail(row.images?.thumbnail_url || ""),
    actions: renderToStaticMarkup(buttons(i)),
  }));

  return (
    <Table<Column, Species>
      rows={parsedRows}
      columns={columns}
      // hover
      onRowClick={handleRowClick}
      onSelectRow={handleSelectRow}
    />
  );
}
