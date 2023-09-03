"use client";

import { canvasToBlob } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropForm from "./CropForm";
import CropPanel, { type CompletedCropArea } from "./CropPanel";
import drawImageOnCanvas from "./drawImageOnCanvas";
import { useToast } from "@/components/ui/use-toast";

export default function CropImageForm() {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File>();
  const [resolution, setResolution] = useState({ width: 500, height: 500 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string>();
  const [crop, setCrop] = useState<CompletedCropArea>();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File | undefined, resolution: string) => {
    if (!crop || !imageRef.current || !canvasRef.current) return;

    drawImageOnCanvas(imageRef.current, canvasRef.current, crop, 100, 100);

    const image = await canvasToBlob(canvasRef.current);

    const { data, error } = await supabase.storage.from("images").upload("image.name3", image, {
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
  };

  const handleCrop = (crop: CompletedCropArea, preview: string | undefined) => {
    setPreview(preview);
    setCrop(crop);

    const upscaleRequired =
      crop.naturalSelectionWidth < resolution.width || crop.naturalSelectionHeight < resolution.height;
    if (upscaleRequired) {
      setErrorMessage("Döhhh!");
    } else {
      setErrorMessage(null);
    }
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
      <CropForm
        setFile={setFile}
        setResolution={setResolution}
        disabled={false}
        onSubmit={handleUpload}
        errorMessage={errorMessage}
      />

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

      <canvas ref={canvasRef} />
    </>
  );
}
