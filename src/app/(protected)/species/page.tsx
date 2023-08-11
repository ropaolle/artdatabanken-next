"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { type Database } from "@/lib/database.types";
import Table from "@/components/Table";

type Column = { label: string; field: string };

const columns = [
  // created_at
  // updated_at
  // { label: "Id", field: "id" },
  // { label: "User Id", field: "id" },
  { label: "Kingdom", field: "kingdom" },
  { label: "Order", field: "taxonomy_order" },
  { label: "Family", field: "family" },
  { label: "Species", field: "species" },
  { label: "Sex", field: "sex" },
  { label: "County", field: "county" },
  { label: "Place", field: "place" },
  { label: "Latin", field: "latin_name" },
  { label: "Image", field: "image" },
];

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function Images() {
  const [species, setSpecies] = useState<Species[]>();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("species").select();
      if (data) setSpecies(data);
    };

    getData();
  }, [supabase]);

  return (
    <>
      <Table<Column, Species> rows={species} columns={columns} />
    </>
  );
}
