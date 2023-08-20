"use client";

import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/database.types";
import { Table, type SelectRow } from "@/components/Table";
import { Female, Male, Trash, Pencil } from "./icons";

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

type Props = {
  rows: Species[];
  count?: number;
};

export default function SpeciesTable({ rows }: Props) {
  const [data, setData] = useState(rows);

  // const handleRowClick = ({ index, row }: RowClick<Species>) => {
  //   console.log(index);
  // };

  const handleSelectRow = ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Species>) => {
    console.log("onSelectRow", selectedIndexes, allSelected, selectedRows);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;

    const dummyId = "ccc033ac-6618-4a91-ade7-aaaaaaaaaaaa";
    const supabase = createClientComponentClient();
    const { error } = await supabase.from("species").delete().eq("id", dummyId);

    if (error) {
      // TODO: Toast error message
      return console.error(error);
    }

    // Delete record from client
    setData((prevValue) => prevValue.filter((row) => row.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("handleEdit", id);
  };

  const family = (row: Species) => (
    <>
      <div className="font-bold">{row.family}</div>
      <div className="mt-2 text-xs text-neutral-600">
        <span className="font-bold">Kingdom: </span>
        {row.kingdom}
      </div>
      <div className="mt-1 text-xs text-neutral-600">
        <span className="font-bold">Order: </span>
        {row.taxonomy_order}
      </div>
    </>
  );

  const species = (row: Species) => (
    <>
      <div className="flex">
        <span className="font-bold text-primary-600">{row.species}</span>
        {row.sex === "male" && <Male />}
        {row.sex === "female" && <Female />}
        {row.sex === "both" && (
          <>
            <Male />
            <Female />
          </>
        )}
      </div>
      <div className="mt-2 text-sm text-neutral-600">{row.latin_name}</div>
    </>
  );

  const image = (url = "") => <>{url && <Image src={url} alt="image" width="100" height="100" loading="lazy" />}</>;

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

  const parsedRows =
    data &&
    data.map((row) => ({
      ...row,
      family: renderToStaticMarkup(family(row)),
      species: renderToStaticMarkup(species(row)),
      image: renderToStaticMarkup(image(row.images?.thumbnail_url || "" /* "/bird.svg" */)),
      actions: renderToStaticMarkup(actions(row.id)),
    }));

  return (
    <Table<Column, Species>
      rows={parsedRows}
      columns={columns}
      hover
      multi
      // onRowClick={handleRowClick}
      onSelectRow={handleSelectRow}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
