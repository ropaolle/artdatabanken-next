"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkboxes, Combobox, DatePicker, Input } from "./Fields";

const items = [
  { id: "recents", label: "Recents" },
  { id: "home", label: "Home" },
  { id: "applications", label: "Applications" },
  { id: "desktop", label: "Desktop" },
  { id: "downloads", label: "Downloads" },
  { id: "documents", label: "Documents" },
] as const;

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const formSchema = z.object({
  // species: z.string().min(2, {
  //   message: "Species name must be at least 2 characters.",
  // }),
  species: z.string().nonempty("This field is reqired."),
  kingdom: z.string(),
  order: z.string(),
  family: z.string(),
  latin: z.string(),
  place: z.string(),
  county: z.string(),
  date: z.date(),
  gender: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function AddSpeciesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kingdom: "",
      species: "",
      order: "",
      family: "",
      latin: "",
      place: "",
      county: "en",
      date: new Date(),
      gender: ["recents", "home"],
      items: ["recents", "home"],
    },
  });

  const control = form.control;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Input control={control} name="species" label="Species *" vertical /* description="asd" */ />
        {/*<Input control={control} name="kingdom" label="Kingdom" vertical />
         <Input control={control} name="order" label="Order" vertical />
        <Input control={control} name="family" label="Family" vertical />
        <Input control={control} name="latin" label="Latin" vertical /> */}

        <div className="space-y-4">
          <Input control={control} name="place" label="Place" vertical />

          <div className="grid grid-cols-2 gap-4">
            <Combobox name="county" label="County" options={languages} control={control} setValue={form.setValue} />
            <DatePicker control={control} name="date" label="Date" />
          </div>
        </div>

        <Checkboxes control={control} items={items} name="items" label="Items" />

        <div className="space-y-8">
          <div></div>
          <div className="flex justify-end ">
            <Close asChild>
              <Button variant="secondary" className="mr-2">
                Cancel
              </Button>
            </Close>
            <Button type="submit">Add species</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
