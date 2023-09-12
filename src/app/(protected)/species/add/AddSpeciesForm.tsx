"use client";

import { Checkboxes, Combobox, ComboboxAsync, DatePicker, Input } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { counties, gender } from "./options";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getPublicUrl } from "@/lib/supabase";

const formSchema = z.object({
  species: z.string().nonempty("This field is reqired."),
  kingdom: z.string(),
  taxonomy_order: z.string(),
  family: z.string(),
  latin_name: z.string(),
  place: z.string(),
  county: z.string(),
  image: z.string(),
  date: z.date(),
  gender: z.array(z.string()),
});

// export type ImageType = { id: string; name: string };

export default function AddSpeciesForm() {
  const supabase = createClientComponentClient();
  const [previewURL, setPreviewURL] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kingdom: "",
      species: "qweqwe",
      taxonomy_order: "",
      family: "",
      latin_name: "",
      place: "",
      county: "",
      image: "",
      date: new Date(),
      gender: ["male"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.info(values);

    values.image = null;

    const { data, error } = await supabase
      .from("species")
      .upsert({ /*id: uuid(), */ ...values })
      .select();

    console.log("data, error", data, error);
  }

  const image = form.watch("image");

  useEffect(() => {
    if (!image) return;

    const publicUrl = getPublicUrl(supabase, "images", image);
    setPreviewURL(publicUrl);
  }, [image]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Input name="species" label="Species *" description="Testbeskrivning" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="kingdom" label="Kingdom" />
              <Input name="taxonomy_order" label="Order" />
              <Input name="family" label="Family" placeholder="My placeholder..." />
              <Input name="latin_name" label="Latin" />
              <Input name="place" label="Place" />
              <Checkboxes name="gender" label="Gender" items={gender} />
              <Combobox name="county" label="County" options={counties} placeholder="Select county…" />
              <DatePicker name="date" label="Date" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <ComboboxAsync name="image" label="Image" placeholder="Select image…" />

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
