"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AddSpeciesForm, type ImagesType } from "@/components/forms/AddSpeciesForm";
import { UploadImageForm } from "@/components/forms/UploadImageForm";
import { CropImageForm } from "@/components/forms/CropImageForm";

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

      // const { data, error } = await supabase.storage.from("images").list("", {
      //   limit: 100,
      //   offset: 0,
      //   sortBy: { column: "name", order: "asc" },
      // });

      setImages(data);
    };

    getData();
  }, [supabase]);

  // const { data } = supabase.storage.from("images").getPublicUrl("avatar3.png");

  return (
    <>
      {/* <h1>Add species</h1>
      <div className=" max-w-lg2">
        <AddSpeciesForm images={images} />
      </div> */}

      <h1>Upload/crop image</h1>
      <div className="max-w-[1032px]">
        {/* <UploadImageForm /> */}
        <CropImageForm />
      </div>
    </>
  );
}
