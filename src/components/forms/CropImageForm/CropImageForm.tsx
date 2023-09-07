"use client";

import { useToast } from "@/components/ui/use-toast";
import { canvasToBlob, suffixFilename } from "@/lib/utils";
import { createClientComponentClient, type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropForm, { FormSchema } from "./CropForm";
import CropPanel, { type CompletedCropArea } from "./CropPanel";
import drawImageOnCanvas from "./drawImageOnCanvas";
import { useAppStore } from "@/state";

const resolutions = [
  { value: "250", label: "250 * 250 px", data: { width: 250, height: 250 } },
  { value: "500", label: <i>500 * 500 px</i>, data: { width: 500, height: 500 } },
  { value: "1000", label: "1000 * 1000 px", data: { width: 1000, height: 1000 } },
];

const uploadFileToSupabase = async (supabase: SupabaseClient, file: Blob, name: string, upsert = false) => {
  const { data, error } = await supabase.storage.from("images").upload(name, file, {
    cacheControl: "3600",
    upsert,
  });

  if (error?.message === "The resource already exists") {
    // ask to try again
    return;
  }

  if (error) {
    console.error(error);
    return;
  }
};

type FormOnChange = (field: string, value: unknown) => void;

export const CustomFormContext = createContext<FormOnChange | null>(null);

export default function CropImageForm() {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File>();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string>();
  const [crop, setCrop] = useState<CompletedCropArea>();
  const { toast } = useToast();
  const {showConfirm} = useAppStore();
  // console.log('x', x);

  const handleSubmit = async ({ files, resolution, options }: FormSchema) => {
    const data = resolutions.find(({ value }) => value === resolution)?.data;
    const filename = files?.[0]?.name;


    showConfirm()
    return;
    
    

   /*  if (!crop || !data || !imageRef.current || !canvasRef.current || !filename) {
      toast({
        title: "Woops!",
        variant: "destructive",
        description: "Something is missing.",
      });
      return;
    }

    const upscaleForbidden = !options.includes("upscale");
    const upscaleRequired = crop.naturalSelectionWidth < data.width || crop.naturalSelectionHeight < data.height;
    if (upscaleForbidden && upscaleRequired) {
      toast({
        title: "Upscale required",
        variant: "warning",
        description: "The croped image have to low resolution and reqires to be upscaled.",
      });
      return;
    }

    // Upload thumbnail
    const thumbFilename = suffixFilename(filename, "_thumbnail");
    drawImageOnCanvas(imageRef.current, canvasRef.current, crop, 100, 100);
    const thumbnail = await canvasToBlob(canvasRef.current, "image/jpeg");
    await uploadFileToSupabase(supabase, thumbnail, thumbFilename, false);

    // Upload image
    drawImageOnCanvas(imageRef.current, canvasRef.current, crop, data.width, data.height);
    const image = await canvasToBlob(canvasRef.current, "image/jpeg");
    await uploadFileToSupabase(supabase, image, filename, false);

    toast({
      title: "Upload succeeded",
      variant: "default",
      description: (
        <>
          Image <i>{filename}</i> and thumbnail <i>{thumbFilename}</i> was uploaded to bucket <i>images</i>.
        </>
      ),
    }); */
  };

  const handleChange = (values: FormSchema) => {
    setFile(values?.files?.[0]);
  };

  const handleCrop = (crop: CompletedCropArea, preview: string | undefined) => {
    setPreview(preview);
    setCrop(crop);
  };

  const Header = ({ label, width, height }: { label: string; width?: number; height?: number }) => (
    <div className="font-medium">
      {label}
      <span className="ml-1 text-sm font-normal">
        (width: {width}px, height: {height}px)
      </span>
    </div>
  );

  const PreviewPane = ({ label }: { label: string }) => (
    <div className="flex h-96 w-full items-center justify-center bg-slate-100 ">
      <div className="text-slate-400">{label}</div>
    </div>
  );

  return (
    <>
      <CropForm resolutions={resolutions} onChange={handleChange} onSubmit={handleSubmit} disabled={!crop} />

      <div className="mt-8 grid grid-cols-1  gap-8 md:grid-cols-2">
        <div className="md:flex md:flex-col">
          <Header label="Original" width={crop?.naturalWidth} height={crop?.naturalHeight} />
          {Boolean(file) ? (
            <CropPanel file={file} onCrop={handleCrop} imageRef={imageRef} />
          ) : (
            <PreviewPane label="Original" />
          )}
        </div>

        <div className="md:flex md:flex-col md:items-end">
          <Header label="Preview" width={crop?.naturalSelectionWidth} height={crop?.naturalSelectionHeight} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {Boolean(file) ? <img src={preview} alt="Preview" /> : <PreviewPane label="Preview" />}
        </div>
      </div>

      <canvas ref={canvasRef} hidden />
    </>
  );
}
