"use client";

import { canvasToBlob } from "@/lib/utils";
import { RefObject, useEffect, useRef, useState } from "react";
import ReactCrop, { type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import drawImageOnCanvas from "./drawImageOnCanvas";

const defaultCropArea: PixelCrop = { unit: "px", width: 200, height: 200, x: 100, y: 100 };

export type CompletedCropArea = PixelCrop & {
  naturalWidth: number;
  naturalHeight: number;
  naturalSelection: number;
  naturalSelectionHeight: number;
  naturalSelectionWidth: number;
};

type Props = {
  file: Blob | undefined;
  imageRef: RefObject<HTMLImageElement>;
  onCrop: (crop: CompletedCropArea, preview: string | undefined) => void;
};

export default function CropPanel({ file, onCrop, imageRef }: Props) {
  const [image, setImage] = useState<string>();
  // const imageRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cropArea, setCropArea] = useState<PixelCrop>(defaultCropArea);

  // Update image and preview canvas
  useEffect(() => {
    // console.log('file', file);
    if (!file || typeof file === "string") {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleCompletedCrop = async (cropArea: PixelCrop) => {
    if (!imageRef.current || !previewCanvasRef.current) return;

    const { width, naturalWidth, height, naturalHeight } = imageRef.current || {};
    const naturalSelectionHeight = height && naturalHeight ? Math.round((cropArea.height / height) * naturalHeight) : 0;
    const naturalSelectionWidth = width && naturalWidth ? Math.round((cropArea.width / width) * naturalWidth) : 0;

    const previewScale = Math.min(imageRef.current.height / cropArea.height, imageRef.current.width / cropArea.width);

    drawImageOnCanvas(
      imageRef.current,
      previewCanvasRef.current,
      cropArea,
      cropArea.width * previewScale,
      cropArea.height * previewScale,
    );

    // FIXA: How-to cleanup this object. Is it even needed?
    const preview = URL.createObjectURL(await canvasToBlob(previewCanvasRef.current));

    onCrop(
      {
        ...cropArea,
        naturalHeight: naturalHeight || 0,
        naturalWidth: naturalWidth || 0,
        naturalSelection: Math.min(naturalSelectionHeight, naturalSelectionWidth),
        naturalSelectionHeight,
        naturalSelectionWidth,
      },
      preview,
    );
  };

  return (
    <>
      <ReactCrop
        crop={cropArea}
        minWidth={100}
        minHeight={100}
        onChange={(c) => setCropArea(c)}
        onComplete={handleCompletedCrop}
        aspect={1}
        // INFO: Overrid inline-block, which creates a small extra bottom margin on the perent
        // element. Can also be removed by setting the parent elements text-size to 0.
        style={{ display: "block" }}
      >
        {/* INFO: We are loading the image dynamically so using a standard img link her is ok. */}
        {/* <Image src={image} ref={imageRef} alt="Crop image" width={rect.width} height={rect.width} /> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          ref={imageRef}
          alt="Crop image"
          className="w-full md:w-auto"
          onLoad={() => handleCompletedCrop(cropArea)}
        />
      </ReactCrop>
      <canvas ref={previewCanvasRef} hidden />
    </>
  );
}
