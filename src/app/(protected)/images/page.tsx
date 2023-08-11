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
  { label: "Filename", field: "filename" },
  { label: "URL", field: "url" },
  { label: "Thumbnail URL", field: "thumbnail_url" },
];

type Images = Database["public"]["Tables"]["images"]["Row"];

export default function Species() {
  const [images, setImages] = useState<Images[]>();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("images").select();
      if (data) setImages(data);
    };

    getData();
  }, [supabase]);

  return (
    <>
      <Table<Column, Images> rows={images} columns={columns} />
    </>
  );
}
