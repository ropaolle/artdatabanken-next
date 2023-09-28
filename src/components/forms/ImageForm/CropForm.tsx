import { Checkboxes, FileInput, Input, Select } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
  onSubmit: (values: SubmitValues) => Promise<void>;
  file?: File;
  originalFilename?: string;
  naturalSelectionHeight?: number;
  naturalSelectionWidth?: number;
};

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];

export default function CropForm({
  onChange,
  onSubmit,
  originalFilename = "",
  naturalSelectionHeight,
  naturalSelectionWidth,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSchema = z
    .object({
      // file: typeof window === "undefined" ? z.undefined() : z.instanceof(File).optional(),
      file:
        typeof window === "undefined"
          ? z.undefined()
          : z
              .instanceof(File)
              .refine((file) => !!file, "Image is required.")
              .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
              .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg and .jpeg files are accepted."),
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

  // INFO: Not sure why, but accessing the file value directly with form.watch("file") causes a useEffect loop.
  const values = form.watch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChange(values.file), [values.file]);

  const handleSubmit = async ({ resolution, file, options }: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    await onSubmit({
      file,
      resolution: resolutions[resolution as keyof typeof resolutions].data,
      originalFilename,
      upscaleRequired: upscaleRequired(resolution, options, naturalSelectionWidth, naturalSelectionHeight),
    });
    setIsSubmitting(false);
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

          <Button
            type="submit"
            className="ml-auto whitespace-nowrap"
            disabled={!naturalSelectionHeight || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload image
          </Button>
        </div>
      </form>
    </Form>
  );
}
