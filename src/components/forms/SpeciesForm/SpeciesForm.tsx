"use client";

import { Checkboxes, Combobox, ComboboxAsync, DatePicker, Input, type Option } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useImageQueryByFilenameQuery, useSpeciesQueryById, useUpsertSpeciesMutation } from "@/supabase/database";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { counties, gender } from "./options";

const formSchema = z.object({
  species: z.string().nonempty("This field is reqired."),
  kingdom: z.string(),
  order: z.string(),
  family: z.string(),
  latin: z.string(),
  place: z.string(),
  county: z.string(),
  image: z.string().nullable(),
  date: z.date().nullable().optional(),
  gender: z.array(z.string()),
});

const defaultValues = {
  kingdom: "",
  species: "",
  order: "",
  family: "",
  latin: "",
  place: "",
  county: "",
  image: null,
  date: null, //new Date(),
  gender: [],
};

function dateStringToDate<T extends { date: string | null }>(object: T) {
  return typeof object.date === "string" ? new Date(object.date) : null;
}

export type SpeciesType = z.infer<typeof formSchema>;

export default function SpeciesForm({ id }: { id?: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(null);
  const [imageSearchQuery, setImageSearchQuery] = useState("");
  const { mutate: updateSpecies } = useUpsertSpeciesMutation();
  const { data: species } = useSpeciesQueryById(id);
  const { data: images, isFetching } = useImageQueryByFilenameQuery(imageSearchQuery);
  const { toast } = useToast();

  const form = useForm<SpeciesType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: species ? { ...species, image: species.image?.id, date: dateStringToDate(species) } : undefined,
  });

  // Load initial preview
  if (previewUrl === null && species?.image?.thumbnail_url) {
    setPreviewUrl(species?.image?.thumbnail_url);
  }

  async function handleSubmit(values: SpeciesType) {
    updateSpecies(
      { ...values, id, date: values.date?.toDateString() },
      {
        onSuccess: () =>
          toast({
            title: `${id ? "Species updated" : "New species created"}`,
            description: `Species ${values.species} ${id ? "updated" : "created"}.`,
          }),
      },
    );
  }

  function handleChange(option?: Option) {
    const thumbnail_url = images?.find(({ id }) => option?.value === id)?.thumbnail_url;
    setPreviewUrl(thumbnail_url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Input name="species" label="Species *" description="Testbeskrivning" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="kingdom" label="Kingdom" />
              <Input name="order" label="Order" />
              <Input name="family" label="Family" placeholder="My placeholder…" />
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
              options={images?.map(({ id, filename }) => ({ value: id, label: filename }))}
              placeholder="Select image…"
              onSearch={(query) => setImageSearchQuery(query)}
              onChange={handleChange}
              loading={isFetching}
            />

            <div className=" flex flex-1 flex-col">
              <div className="mt-4 text-sm font-medium leading-none">Preview</div>
              <div className="bg-slate-50-DEL mt-1 flex w-full flex-1 justify-center rounded-sm border p-2">
                {previewUrl && (
                  <Image src={previewUrl} alt="Preview" width="200" height="200" className="h-auto w-auto" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div></div>
          <div className="flex justify-end ">
            <Button type="submit">{id ? "Update species" : "Add species"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
