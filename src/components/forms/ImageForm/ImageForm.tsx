"use client";

import useConfirm from "@/components/hooks/useConfirm";
import { useToast } from "@/components/ui/use-toast";
import { getImageId, getPublicUrl, uploadFileToSupabase } from "@/lib/supabase";
import { canvasToBlob, suffixFilename } from "@/lib/utils";
import { useAppStore } from "@/state";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropForm, { type SubmitValues } from "./CropForm";
import CropPanel, { type CompletedCropArea } from "./CropPanel";
import drawImageOnCanvas from "./drawImageOnCanvas";

const confirmDelete = (filename: string) => ({
  title: "Overwrite existing image?",
  message: (
    <>
      Image <strong>{filename}</strong> already exists. Do you like to replace the existing image?
    </>
  ),
  confirmLabel: "Overwrite image",
});

export default function ImageForm({ originalFilename }: { originalFilename?: string }) {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File>();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string>();
  const [crop, setCrop] = useState<CompletedCropArea>();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { user } = useAppStore();

  useEffect(() => {
    const loadFile = async () => {
      if (!originalFilename) return;
      const { data: blob, error } = await supabase.storage.from("images").download(`${user?.id}/${originalFilename}`);
      if (!blob) return;
      setFile(new File([blob], originalFilename));
    };

    loadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalFilename]);

  const uploadImage = async ({
    path,
    width,
    height,
    file,
  }: {
    path: string;
    width?: number;
    height?: number;
    file?: File | Blob;
  }) => {
    if (!file) {
      if (!imageRef.current || !canvasRef.current || !crop || !width || !height) return;
      drawImageOnCanvas(imageRef.current, canvasRef.current, crop, width, height);
      file = await canvasToBlob(canvasRef.current);
    }

    await uploadFileToSupabase(supabase, file, "images", path, true);
  };

  const handleSubmit = async ({
    file,
    resolution: { width, height },
    originalFilename,
    upscaleRequired,
  }: SubmitValues) => {
    const filename = file?.name || originalFilename;
    if (!user || !filename || !imageRef.current) {
      toast({
        title: "Woops!",
        variant: "destructive",
        description: "Something is missing.",
      });
      return;
    }

    const imagePath = user.id + "/" + filename;
    const cropPath = user.id + "/" + suffixFilename(filename, "-crop");
    const thumbPath = user.id + "/" + suffixFilename(filename, "-thumbnail");

    const imageId = await getImageId(supabase, user.id, filename);
    if (imageId && !(await confirm(confirmDelete(filename)))) {
      return;
    }

    if (file) uploadImage({ path: imagePath, file });
    uploadImage({ path: cropPath, width, height });
    uploadImage({ path: thumbPath, width: 100, height: 100 });

    /*  const { data, error } = */ await supabase
      .from("images")
      .upsert({
        id: imageId,
        filename: filename,
        crop_width: width,
        crop_height: height,
        upscaled: upscaleRequired,
        natural_width: imageRef.current.naturalWidth,
        natural_height: imageRef.current.naturalHeight,
        url: getPublicUrl(supabase, "images", imagePath),
        crop_url: getPublicUrl(supabase, "images", cropPath),
        thumbnail_url: getPublicUrl(supabase, "images", thumbPath),
      })
      .select();

    toast({
      title: "Upload succeeded",
      description: (
        <>
          Image <i>{filename}</i> successfully uploaded to bucket <i>images</i>.
        </>
      ),
    });
  };

  const handleChange = (file?: File) => {
    setFile(file);
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
      <CropForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        naturalSelectionHeight={crop?.naturalSelectionHeight}
        naturalSelectionWidth={crop?.naturalSelectionWidth}
        originalFilename={originalFilename}
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

      <canvas ref={canvasRef} hidden />
    </>
  );
}
