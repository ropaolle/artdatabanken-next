import { Checkboxes, FileInput, Input, Select } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const optionValues = [{ id: "allowUpscale", label: "Allow upscale" }] as const;

const resolutions = {
  r250: { value: "r250", label: "250 * 250 px", data: { width: 250, height: 250 } },
  r500: { value: "r500", label: <b>500 * 500 px</b>, data: { width: 500, height: 500 } },
  r1000: { value: "1000", label: "1000 * 1000 px", data: { width: 1000, height: 1000 } },
};

const upscaleRequired = (
  resolution: string,
  options: string[],
  naturalSelectionWidth?: number,
  naturalSelectionHeight?: number,
) => {
  const { width, height } = resolutions[resolution as keyof typeof resolutions].data;
  const upscaleForbidden = !options.includes("allowUpscale");
  const upscaleRequired = (naturalSelectionWidth || 0) < width || (naturalSelectionHeight || 0) < height;
  return !(upscaleForbidden && upscaleRequired);
};

export type SubmitValues = {
  file?: File;
  resolution: { width: number; height: number };
  originalFilename: string;
  upscaleRequired: boolean;
};

type Props = {
  onChange: (values?: File) => void;
  onSubmit: (values: SubmitValues) => void;
  file?: File;
  originalFilename?: string;
  naturalSelectionHeight?: number;
  naturalSelectionWidth?: number;
};

export default function CropForm({
  onChange,
  onSubmit,
  originalFilename = "",
  naturalSelectionHeight,
  naturalSelectionWidth,
}: Props) {
  const formSchema = z
    .object({
      file: typeof window === "undefined" ? z.undefined() : z.instanceof(File).optional(),
      resolution: z.string(),
      originalFilename: z.string(),
      options: z.array(z.string()),
    })
    .refine(
      ({ resolution, options }) => {
        return upscaleRequired(resolution, options, naturalSelectionWidth, naturalSelectionHeight);
      },
      {
        message: "Selection resolution is too low.",
        path: ["options"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      originalFilename,
      resolution: "r500",
      options: ["allowUpscale"],
    },
  });

  const values = form.watch();

  useEffect(() => {
    onChange(values.file);

    // 'values' cannot be used directly as a dependency as it would triggerd the effect on
    // each re-render.But if we only use a string, like the filename, the effect will only
    // be trigger when the name actually is changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.file?.name]);

  const handleSubmit = ({ resolution, file, options }: z.infer<typeof formSchema>) => {
    onSubmit({
      file,
      resolution: resolutions[resolution as keyof typeof resolutions].data,
      originalFilename,
      upscaleRequired: upscaleRequired(resolution, options, naturalSelectionWidth, naturalSelectionHeight),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full self-start md:w-auto">
            {originalFilename ? (
              <Input name="originalFilename" label="Source image" readOnly />
            ) : (
              <FileInput type="file" name="file" label="Source image" accept=".jpg" />
            )}
          </div>

          <div className="w-full self-start md:w-auto">
            <Select name="resolution" label="Target resolution" options={toOptions(resolutions)} />
          </div>

          <div className="w-full self-start md:w-auto">
            <Checkboxes name="options" label="Options" items={optionValues} />
          </div>

          <Button type="submit" className="ml-auto whitespace-nowrap" disabled={!naturalSelectionHeight}>
            Upload image
          </Button>
        </div>
      </form>
    </Form>
  );
}
