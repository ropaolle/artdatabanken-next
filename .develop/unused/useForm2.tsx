"use client";

import { Button } from "@/components/ui/button";
import { FileInput, FileInput2, Select } from "@/components/fields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type Resolution = typeof resolutions.w500h500;
type ResolutionKeys = keyof typeof resolutions;

const resolutions = {
  w250h250: { width: 250, height: 250, label: "250 * 250 px" },
  w500h500: { width: 500, height: 500, label: "500 * 500 px" },
  w1000h1000: { width: 1000, height: 1000, label: "1000 * 1000 px" },
};

const formSchema = z.object({
  // filename: z.any(),
  filename: z.instanceof(Blob, { message: "Profile is required" }),
  resolution: z.custom<ResolutionKeys>(),
});

const getResolution = (resolution: ResolutionKeys) => resolutions[resolution];

export default function useForm2(
  disabled: boolean,
  onClick: (file: Blob | undefined, resolution: Resolution) => void,
  errorMessage: ReactNode,
): [() => JSX.Element, Blob | undefined, typeof resolutions.w500h500] {
  const form =
    useForm<z.infer<typeof formSchema>>(/* {
    resolver: zodResolver(formSchema),
    defaultValues: {
      // file: new File([],""),
      filename: "",
      resolution: "w500h500",
    },
  } */);

  const x = form.watch(["filename", "resolution"]);

  console.log("x", x);

  // const file = form.watch("filename");
  // const resolution = form.watch("resolution");

  async function onSubmit({ filename, resolution }: z.infer<typeof formSchema>) {
    console.info(filename, resolution);
    onClick(filename, getResolution(resolution));
  }

  const selectItems = () =>
    Object.keys(resolutions).map((id) => {
      const { label } = resolutions[id as keyof typeof resolutions];
      return { label, value: id };
    });

  const CropForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-auto">
            <FileInput2
            type="file"
              name="filename"
              label="Source image"
              accept=".jpg"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>

          <div className="w-full md:w-auto">
            <Select name="resolution" label="Target resolution" items={selectItems()} />
          </div>

          <Button type="submit" className="ml-auto whitespace-nowrap" /* disabled={disabled} */>
            Crop image
          </Button>
        </div>

        {errorMessage && (
          <div className="justify-end-DEL mt-4 flex w-full items-center text-red-500">{errorMessage}</div>
        )}
      </form>
    </Form>
  );

  return [CropForm, "file", "getResolution(resolution)"];
}
