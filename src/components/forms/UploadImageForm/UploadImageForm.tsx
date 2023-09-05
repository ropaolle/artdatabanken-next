"use client";

import { FileInput } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

// TODO: (nice to have) Validate type and file size
// - https://github.com/colinhacks/zod/issues/387
// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// image: z.object({
//   profileImage: z
//     .any()
//     .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
//     .refine((files) => files?.[0]?.size >= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       ".jpg, .jpeg, .png and .webp files are accepted.",
//     ),
// }),

const formSchema = z.object({
  image: z.custom<File>().nullable(),
});

export default function UploadImageForm(/* { images }: { images: ImagesType } */) {
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
    },
  });

  async function onSubmit({ image }: z.infer<typeof formSchema>) {
    if (!image) return;

    const { data, error } = await supabase.storage.from("images").upload(image.name, image, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.error(error);
      return;
    }

    toast({
      title: "File uploaded",
      description: (
        <>
          Image <i>{data.path}</i> uploaded to bucket <i>images</i>.
        </>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <FileInput
              name="image"
              label="Image *"
              /* description="My description..." */ accept=".jpg" /* multiple */
            />
          </div>
        </div>

        <div className="space-y-8">
          <div></div>
          <div className="flex justify-end ">
            <Button type="submit">Add image</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
