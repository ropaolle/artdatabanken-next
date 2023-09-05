"use client";

import { Checkboxes, FileInput, Select } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const optionValues = [{ id: "upscale", label: "Allow upscale" }] as const;

const formSchema = z.object({
  resolution: z.string(),
  files: typeof window === "undefined" ? z.undefined() : z.instanceof(FileList),
  options: z.array(z.string()),
});

export type FormSchema = z.infer<typeof formSchema>;

type Props = {
  disabled?: boolean;
  resolutions: { value: string; label: ReactNode; data: unknown }[];
  onChange: (values: FormSchema) => void;
  onSubmit: (values: FormSchema) => void;
};

export default function CropForm({ disabled, resolutions, onChange, onSubmit }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
      resolution: resolutions[1].value,
      options: ["upscale"],
    },
  });

  const values = form.watch();

  useEffect(() => {
    onChange(values);

    // 'values' cannot be used directly as a dependency as it would triggerd the effect on
    // each re-render.But if we only use a string, like the filename, the effect will only
    // be trigger when the name actually is changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.files?.[0]?.name]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-auto">
            <FileInput type="file" name="files" label="Source image" accept=".jpg" />
          </div>

          <div className="w-full md:w-auto">
            <Select name="resolution" label="Target resolution" options={resolutions} />
          </div>

          <div className="w-full self-start md:w-auto">
            <Checkboxes name="options" label="Options" items={optionValues} />
          </div>

          <Button type="submit" className="ml-auto whitespace-nowrap" disabled={disabled}>
            Crop image
          </Button>
        </div>
      </form>
    </Form>
  );
}
