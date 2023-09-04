"use client";

import { Checkboxes, FileInput, Select, selectGetData } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import * as z from "zod";

const resolutions = [
  { value: "250", label: "250 * 250 px", data: { width: 250, height: 250 } },
  { value: "500", label: <strong>500 * 500 px</strong>, data: { width: 500, height: 500 } },
  { value: "1000", label: "1000 * 1000 px", data: { width: 1000, height: 1000 } },
];

export const optionValues = [{ id: "upscale", label: "Allow upscale" }] as const;

// type SetFile = File | undefined;
// type SetResolution = { width: number; height: number };
// export type CustomFormSchema = { file: SetFile; resolution: SetResolution };

const formSchema = z.object({
  resolution: z.string(),
  files: typeof window === "undefined" ? z.undefined() : z.instanceof(FileList),
  options: z.array(z.string()),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
  disabled?: boolean;
  errorMessage?: ReactNode;
  // setFile: Dispatch<SetStateAction<SetFile>>;
  // setResolution: Dispatch<SetStateAction<SetResolution>>;
  onChange: (values: FormSchema) => void;
  onSubmit: (values: FormSchema) => void;
};

export default function CropForm({ disabled, /* setFile, setResolution, */ onChange,  onSubmit, errorMessage }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
      resolution: resolutions[1].value,
      options: ['upscale'],
    },
  });

  const values = form.watch();

  useEffect(() => {
    // console.log("resolution", resolution);
    onChange(values)
    // TODO: What to watch
  }, [values.resolution, values.files?.[0].name, values.options.length/* , onChange */]);

  // async function handleSubmit({ files, resolution }: z.infer<typeof formSchema>) {
  // // async function handleSubmit({ files, resolution }: z.infer<typeof formSchema>) {
  //   // onSubmit({ file: files?.[0], resolution: selectGetData(resolutions, resolution) });
  //   onSubmit({ file: files?.[0], resolution: selectGetData(resolutions, resolution) });
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-auto">
            <FileInput
              type="file"
              name="files"
              label="Source image"
              accept=".jpg"
              // setState={(files) => setFile(files?.[0])}
            />
          </div>

          <div className="w-full md:w-auto">
            <Select name="resolution" label="Target resolution" options={resolutions} /* setState={setResolution} */ />
          </div>

          <div className="w-full self-start md:w-auto">
            <Checkboxes name="options" label="Options" items={optionValues} />
          </div>

          <Button type="submit" className="ml-auto whitespace-nowrap" disabled={disabled}>
            Crop image
          </Button>
        </div>

        {errorMessage && (
          <div className="justify-end-DEL mt-4 flex w-full items-center text-red-500">{errorMessage}</div>
        )}
      </form>
    </Form>
  );
}
