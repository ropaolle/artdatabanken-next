"use client";

import { FileInput, Select } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const resolutions = [
  { value: "w250h250", label: "250 * 250 px" },
  { value: "w500h500", label: "500 * 500 px" },
  { value: "w1000h1000", label: "1000 * 1000 px" },
];

const formSchema = z.object({
  resolution: z.string(),
  filename: z.any(),
  // filename: z.instanceof(File/* , { message: "Profile is required" } */),
});

type Props = {
  disabled?: boolean;
  errorMessage?: ReactNode;
  setFile: Dispatch<SetStateAction<Blob | undefined>>;
  setResolution: Dispatch<SetStateAction<{ width: number; height: number }>>;
  onSubmit: (file: Blob | undefined, resolution: string) => void;
};

export default function CropForm({ disabled, setFile, setResolution, onSubmit, errorMessage }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filename: "",
      resolution: "w500h500",
    },
  });

  async function handleSubmit({ filename, resolution }: z.infer<typeof formSchema>) {
    console.info(filename, resolution);
    onSubmit(filename, resolution);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-auto">
            <FileInput
              type="file"
              name="filename"
              label="Source image"
              accept=".jpg"
              setState={(files) => setFile(files?.[0])}
            />
          </div>

          <div className="w-full md:w-auto">
            <Select
              name="resolution"
              label="Target resolution"
              items={resolutions}
              setState={(resolution) => {
                const [width, height] = resolution
                  .replace("w", "")
                  .split("h")
                  .map((val) => Number(val));
                setResolution({ width, height });
              }}
            />
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
