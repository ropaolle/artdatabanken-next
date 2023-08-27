"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkboxes, Combobox, DatePicker, Input } from "./Fields";

const gender = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
] as const;

const counties = [
  { value: "uppland", label: "Uppland" },
  { value: "stockholm", label: "Stockholms län" },
  { value: "uppsala", label: "Uppsala län" },
  { value: "sodermanland", label: "Södermanlands län", alternativeLabel: "Sörmlands län" },
  { value: "ostergotland", label: "Östergötlands län" },
  { value: "jonkoping", label: "Jönköpings län" },
  { value: "kronoberg", label: "Kronobergs län" },
  { value: "kalmar", label: "Kalmar län", alternativeLabel: "Ölands län" },
  { value: "gotland", label: "Gotlands län" },
  { value: "blekinge", label: "Blekinge län" },
  { value: "skane", label: "Skåne län" },
  { value: "halland", label: "Hallands län" },
  { value: "vastra-gotaland", label: "Västra Götalands län" },
  { value: "varmland", label: "Värmlands län" },
  { value: "orebro", label: "Örebro län" },
  { value: "vastmanland", label: "Västmanlands län" },
  { value: "dalarna", label: "Dalarnas län" },
  { value: "gavleborg", label: "Gävleborgs län" },
  { value: "vasternorrland", label: "Västernorrlands län" },
  { value: "jamtland", label: "Jämtlands län" },
  { value: "vasterbotten", label: "Västerbottens län", alternativeLabel: "Lapplands län" },
  { value: "norrbotten", label: "Norrbottens län" },
] as const;

const images = [
  { value: "image1", label: "Image 1" },
  { value: "image2", label: "Image 2" },
  { value: "image3", label: "Image 3" },
  { value: "image4", label: "Image 4" },
  { value: "image5", label: "Image 5" },
  { value: "image6", label: "Image 6" },
  { value: "image7", label: "Image 7" },
  { value: "image8", label: "Image 8" },
  { value: "image9", label: "Image 9" },
  { value: "image10", label: "Image 10" },
  { value: "image11", label: "Image 11" },
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
  image: z.string(),
  date: z.date(),
  gender: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  // items: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
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
      county: "",
      image: "",
      date: new Date(),
      gender: ["male", "female"],
    },
  });

  const { control, setValue } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Input name="species" label="Species *" /* description="asd" */ />
            <div className="grid grid-cols-2 gap-4">
              <Input name="kingdom" label="Kingdom" />
              <Input name="order" label="Order" />
              <Input name="family" label="Family" />
              <Input name="latin" label="Latin" />
              <Input name="place" label="Place" />
              <Checkboxes name="gender" label="Gender" items={gender} />
              <Combobox name="county" label="County" options={counties} placeholder="Select county…" />
              <DatePicker name="date" label="Date" />
            </div>
          </div>

          <div className="space-y-2">
            <Combobox name="image" label="Image" options={images} placeholder="Select image…" />
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
