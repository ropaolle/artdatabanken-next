"use client";

import { useToast, type CustomToastProps } from "@/components/ui/use-toast";
import { uploadFileToSupabase } from "@/lib/supabase";
import { canvasToBlob, suffixFilename } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropForm, { FormSchema } from "./CropForm";
import CropPanel, { type CompletedCropArea } from "./CropPanel";
import drawImageOnCanvas from "./drawImageOnCanvas";

const resolutions = [
  { value: "250", label: "250 * 250 px", data: { width: 250, height: 250 } },
  { value: "500", label: <i>500 * 500 px</i>, data: { width: 500, height: 500 } },
  { value: "1000", label: "1000 * 1000 px", data: { width: 1000, height: 1000 } },
];

const woops: CustomToastProps = {
  title: "Woops!",
  variant: "destructive",
  description: "Something is missing.",
};

const upscaleWarning: CustomToastProps = {
  title: "Upscale required",
  variant: "warning",
  description: "The croped image resolution is lower than the target resolution and must be upscaled.",
};

const uploadSuccess = (filename: string, thumbFilename: string): CustomToastProps => ({
  title: "Upload succeeded",
  variant: "default",
  description: (
    <>
      Image <i>{filename}</i> and thumbnail <i>{thumbFilename}</i> was uploaded to bucket <i>images</i>.
    </>
  ),
});

export default function CropImageForm() {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File>();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string>();
  const [crop, setCrop] = useState<CompletedCropArea>();
  const { toast } = useToast();

  const uploadImage = async (filename: string, width: number, height: number) => {
    if (!imageRef.current || !canvasRef.current || !crop) return;

    drawImageOnCanvas(imageRef.current, canvasRef.current, crop, width, height);
    const blob = await canvasToBlob(canvasRef.current, "image/jpeg");
    await uploadFileToSupabase(supabase, blob, filename, false);
  };

  const handleSubmit = async ({ files, resolution, options }: FormSchema) => {
    const data = resolutions.find(({ value }) => value === resolution)?.data;
    const filename = files?.[0]?.name;

    if (!crop || !data || !imageRef.current || !canvasRef.current || !filename) {
      toast(woops);
      return;
    }

    const upscaleForbidden = !options.includes("upscale");
    const upscaleRequired = crop.naturalSelectionWidth < data.width || crop.naturalSelectionHeight < data.height;
    if (upscaleForbidden && upscaleRequired) {
      toast(upscaleWarning);
      return;
    }

    // Upload thumbnail
    const thumbFilename = suffixFilename(filename, "_thumbnail");
    uploadImage(thumbFilename, 100, 100);

    // Upload image
    uploadImage(filename, data?.width, data?.height);

    toast(uploadSuccess(filename, thumbFilename));
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
