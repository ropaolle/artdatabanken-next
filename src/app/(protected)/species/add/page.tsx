"use client";

import { AddSpeciesForm, ImagesType } from "@/components/forms/AddSpeciesForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function SpeciesAdd() {
  const [images, setImages] = useState<ImagesType>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("images")
        .select("filename, id", { count: "exact" /* , head: true  */ })
        .order("updated_at", { ascending: true })
        .limit(3);
      // const { data, error } = await supabase.storage.from("images").list("", {
      //   limit: 100,
      //   offset: 0,
      //   sortBy: { column: "name", order: "asc" },
      // });

      setImages(data);
    };

    getData();
  }, [supabase]);
  return (
    <>
      <h1>Add species</h1>
      <div className=" max-w-lg2">
        <AddSpeciesForm images={images} />
      </div>
    </>
  );
}
