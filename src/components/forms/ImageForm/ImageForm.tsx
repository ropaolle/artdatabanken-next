"use client";

import useConfirm from "@/components/hooks/useConfirm";
import { useToast } from "@/components/ui/use-toast";
import { canvasToBlob, suffixFilename } from "@/lib/utils";
import useImageId from "@/supabase/database/use-image-id";
import useUpsertImageMutation from "@/supabase/database/use-upsert-image-mutation";
import { useLoadFile } from "@/supabase/storage/use-load-file";
import { usePublicUrl } from "@/supabase/storage/use-public-url";
import useUploadFile from "@/supabase/storage/use-upload-file";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropForm, { type SubmitValues } from "./CropForm";
import CropPanel, { type CompletedCropArea } from "./CropPanel";
import drawImageOnCanvas from "./drawImageOnCanvas";

const SUPABASE_BUCKET = "images";

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
  const [file, setFile] = useState<File>();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string>();
  const [crop, setCrop] = useState<CompletedCropArea>();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { data: imageId } = useImageId(file?.name);
  const { mutate: updateImage } = useUpsertImageMutation();
  // TODO: merge into useStorage?
  const getPublicURL = usePublicUrl();
  const { uploadFile, isUploading } = useUploadFile();
  const loadFile = useLoadFile();

  useEffect(() => {
    if (!originalFilename || (originalFilename && file)) return;

    const loadOriginalFile = async () => {
      const { data: blob } = await loadFile(SUPABASE_BUCKET, originalFilename);
      setFile(blob ? new File([blob], originalFilename) : undefined);
    };

    loadOriginalFile();
  }, [originalFilename, loadFile, file]);

  const getBlob = useCallback(
    async (width: number, height: number) => {
      if (!imageRef.current || !canvasRef.current || !crop) return;
      drawImageOnCanvas(imageRef.current, canvasRef.current, crop, width, height);
      return await canvasToBlob(canvasRef.current);
    },
    [crop],
  );

  const handleSubmit = async ({
    file,
    resolution: { width, height },
    originalFilename,
    upscaleRequired,
  }: SubmitValues) => {
    const filename = file?.name || originalFilename;
    const cropFilename = suffixFilename(filename, "-crop");
    const thumbFileName = suffixFilename(filename, "-thumbnail");

    if (!filename || !imageRef.current) {
      toast({
        title: "Woops!",
        variant: "destructive",
        description: "Something is missing.",
      });
      return;
    }

    if (imageId && !(await confirm(confirmDelete(filename)))) {
      return;
    }

    // Try/catch?
    await uploadFile(file, SUPABASE_BUCKET, filename, { upsert: true });
    await uploadFile(await getBlob(width, height), SUPABASE_BUCKET, cropFilename, { upsert: true });
    await uploadFile(await getBlob(100, 100), SUPABASE_BUCKET, thumbFileName, { upsert: true });

    updateImage(
      {
        id: imageId || undefined,
        filename: filename,
        crop_width: width,
        crop_height: height,
        upscaled: upscaleRequired,
        natural_width: imageRef.current.naturalWidth,
        natural_height: imageRef.current.naturalHeight,
        url: getPublicURL(SUPABASE_BUCKET, filename),
        crop_url: getPublicURL(SUPABASE_BUCKET, cropFilename),
        thumbnail_url: getPublicURL(SUPABASE_BUCKET, thumbFileName),
      },
      {
        onSuccess: () =>
          toast({
            title: "Upload succeeded",
            description: (
              <>
                Image <i>{filename}</i> successfully uploaded to bucket <i>images</i>.
              </>
            ),
          }),
      },
    );
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
        onChange={(files) => setFile(files?.[0])}
        onSubmit={handleSubmit}
        naturalSelectionHeight={crop?.naturalSelectionHeight}
        naturalSelectionWidth={crop?.naturalSelectionWidth}
        originalFilename={originalFilename}
      />

      <div className="mt-8 grid grid-cols-1  gap-8 md:grid-cols-2">
        <div className="md:flex md:flex-col">
          <Header label="Original" width={crop?.naturalWidth} height={crop?.naturalHeight} />
          {file ? <CropPanel file={file} onCrop={handleCrop} imageRef={imageRef} /> : <PreviewPane label="Original" />}
        </div>

        <div className="md:flex md:flex-col md:items-end">
          <Header label="Preview" width={crop?.naturalSelectionWidth} height={crop?.naturalSelectionHeight} />
          {file && preview ? (
            <Image src={preview} alt="Preview" width="200" height="200" className="h-auto w-auto" />
          ) : (
            <PreviewPane label="Preview" />
          )}
        </div>
      </div>

      <canvas ref={canvasRef} hidden />
    </>
  );
}
