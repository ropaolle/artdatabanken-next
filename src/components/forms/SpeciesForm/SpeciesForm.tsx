"use client";

import { Checkboxes, Combobox, ComboboxAsync, DatePicker, Input, type Option } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { counties, gender } from "./options";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getPublicUrl } from "@/lib/supabase";

// import { type Database } from "@/lib/database.types";

// export type Species = Database["public"]["Tables"]["species"]["Row"] & {
//   images: { thumbnail_url: string | null } | null;
// };

const formSchema = z.object({
  species: z.string().nonempty("This field is reqired."),
  kingdom: z.string(),
  order: z.string(),
  family: z.string(),
  latin: z.string(),
  place: z.string(),
  county: z.string(),
  image: z.string().nullable(),
  date: z.date().nullable(),
  gender: z.array(z.string()),
});

export type SpeciesType = z.infer<typeof formSchema>;

export default function SpeciesForm({ values }: { values?: SpeciesType | null }) {
  const supabase = createClientComponentClient();
  const [previewURL, setPreviewURL] = useState<string>();

  const form = useForm<SpeciesType>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      kingdom: "",
      species: "",
      order: "",
      family: "",
      latin: "",
      place: "",
      county: "",
      image: null,
      date: new Date(),
      gender: [],
    },
  });

  async function onSubmit(values: SpeciesType) {
    console.info(values);

    const { data, error } = await supabase
      .from("species")
      .upsert({ /*id: uuid(), */ ...values })
      .select();

    if (error) {
      console.error(error);
      return;
    }

    console.log("data", data);
  }

  const handleImageChange = ({ label }: Option) => {
    const { publicUrl } = getPublicUrl(supabase, "images", "pictures/" + label);
    setPreviewURL(publicUrl);
  };

  const handleLoadImageOptions = async (query: string) => {
    const { data: rows } = await supabase
      .from("images")
      .select("filename, id")
      .like("filename", `%${query}%`)
      .order("filename", { ascending: true })
      .limit(10);

    return rows?.map(({ id, filename }) => ({ value: id, label: filename })) || [];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Input name="species" label="Species *" description="Testbeskrivning" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="kingdom" label="Kingdom" />
              <Input name="order" label="Order" />
              <Input name="family" label="Family" placeholder="My placeholder..." />
              <Input name="latin" label="Latin" />
              <Input name="place" label="Place" />
              <Checkboxes name="gender" label="Gender" items={gender} />
              <Combobox name="county" label="County" options={counties} placeholder="Select county…" />
              <DatePicker name="date" label="Date" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <ComboboxAsync
              name="image"
              label="Image"
              placeholder="Select image…"
              onChange={handleImageChange}
              loadOptionsAsync={handleLoadImageOptions}
            />

            <div className=" flex flex-1 flex-col">
              <div className="mt-4 text-sm font-medium leading-none">Preview</div>
              <div className="bg-slate-50-DEL mt-1  flex w-full flex-1 justify-center rounded-sm border p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {previewURL && <img src={previewURL} alt="Preview" className="max-h-[280px]" />}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div></div>
          <div className="flex justify-end ">
            <Button type="submit">Add species</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
