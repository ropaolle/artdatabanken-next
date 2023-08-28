"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { AddSpeciesForm, type ImagesType } from "@/components/forms/AddSpeciesForm";

export default function Collections() {
  const [images, setImages] = useState<ImagesType>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("images")
        .select("filename, id", { count: "exact" /* , head: true  */ })
        .order("updated_at", { ascending: true })
        .limit(3);

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
