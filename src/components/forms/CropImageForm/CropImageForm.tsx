"use client";

// Example: https://codesandbox.io/s/wonderful-pine-i7fs3?file=/src/Demo.tsx:173-286
// Repo: https://github.com/DominicTobias/react-image-crop#example
// Demo: https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-y831o

import { Button } from "@/components/ui/button";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import ReactCrop, { type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { XCircle } from "lucide-react";
import useDebounceEffect from "@/components/hooks/useDebounceEffect";
import { Input } from "@/components/ui/input";
import drawImageOnCanvas from "./drawImageOnCanvas";
import { useResizeObserver } from "@/components/hooks/useResizeObserver";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const resolutions = {
  w250h250: { width: 250, height: 250, label: "250 * 250 px" },
  w500h500: { width: 500, height: 500, label: "500 * 500 px" },
  w1000h1000: { width: 1000, height: 1000, label: "1000 * 1000 px" },
};

const defaultCropArea: PixelCrop = { unit: "px", width: 200, height: 200, x: 100, y: 100 };

type CompletedCropArea = PixelCrop & {
  naturalWidth: number;
  naturalHeight: number;
  naturalSelection: number;
  naturalSelectionHeight: number;
  naturalSelectionWidth: number;
};

const clearCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { current: canvas } = canvasRef || {};
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export default function CropImageForm() {
  // const supabase = createClientComponentClient();
  // const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedResolution, setSelectedResolution] = useState("w500h500");

  const [image, setImage] = useState<string>();
  const [sizeRef, rect] = useResizeObserver();
  const [cropArea, setCropArea] = useState<PixelCrop>(defaultCropArea);
  const [completedCrop, setCompletedCrop] = useState<CompletedCropArea>();
  const imageCanvasRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  // const cropCanvasRef = useRef<HTMLCanvasElement>(null);
  // const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null);

  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  const handleCompletedCrop = (cropArea: PixelCrop) => {
    const { width, naturalWidth, height, naturalHeight } = imageCanvasRef.current || {};
    const naturalSelectionHeight = height && naturalHeight ? Math.round((cropArea.height / height) * naturalHeight) : 0;
    const naturalSelectionWidth = width && naturalWidth ? Math.round((cropArea.width / width) * naturalWidth) : 0;
    setCompletedCrop({
      ...cropArea,
      naturalHeight: naturalHeight || 0,
      naturalWidth: naturalWidth || 0,
      naturalSelection: Math.min(naturalSelectionHeight, naturalSelectionWidth),
      naturalSelectionHeight,
      naturalSelectionWidth,
    });
  };

  // Check resolution
  useEffect(() => {
    if (!completedCrop) return;
    const { width, height } = resolutions[selectedResolution as keyof typeof resolutions];
    const { naturalSelectionHeight, naturalSelectionWidth } = completedCrop;
    const upscaleReqired = naturalSelectionHeight < height || naturalSelectionWidth < width;
    setErrorMessage(
      upscaleReqired && (
        <>
          <XCircle className="mr-1 h-4 w-4" /> Selection do not cover the target resolution. The image have to be
          upscaled.
        </>
      ),
    );
  }, [completedCrop, selectedResolution]);

  // Update image and preview canvas
  useEffect(() => {
    clearCanvas(previewCanvasRef);

    if (!selectedFile) {
      setCompletedCrop(undefined);
      setImage(undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // Draw preview
  useDebounceEffect(
    async () => {
      if (completedCrop && imageCanvasRef.current && previewCanvasRef.current) {
        const previewScale = Math.min(rect.height / completedCrop.height, rect.width / completedCrop.width);
        drawImageOnCanvas(
          imageCanvasRef.current,
          previewCanvasRef.current,
          completedCrop,
          completedCrop.width * previewScale,
          completedCrop.height * previewScale,
        );
      }
    },
    200,
    [completedCrop],
  );

  const handleChange = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    setSelectedFile(file || null);
  };

  const PreviewPane = ({ label = "" }) => (
    <div className="flex h-96 w-full items-center justify-center bg-slate-100 ">
      <div className="text-slate-400">{label}</div>
    </div>
  );

  // const canvasToBlob = async (ref: HTMLCanvasElement): Promise<Blob> => {
  //   return new Promise((resolve, reject) => {
  //     ref.toBlob((blob) => {
  //       if (!blob) {
  //         reject(new Error("Failed to create blob"));
  //         return;
  //       }
  //       resolve(blob);
  //     }, "image/jpeg");
  //   });
  // };

  // async function handleClick() {
  //   // const image = previewCanvasRef.current;
  //   if (!previewCanvasRef.current) return;

  //   const image = await canvasToBlob(previewCanvasRef.current);

  //   const { data, error } = await supabase.storage.from("images").upload("image.name3", image, {
  //     cacheControl: "3600",
  //     upsert: true,
  //   });

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   toast({
  //     title: "File uploaded",
  //     description: (
  //       <>
  //         Image <i>{data.path}</i> uploaded to bucket <i>images</i>.
  //       </>
  //     ),
  //   });
  // }

  const selectItems = () =>
    Object.keys(resolutions).map((id) => {
      const { label } = resolutions[id as keyof typeof resolutions];
      return (
        <SelectItem value={id} key={id}>
          {label}
        </SelectItem>
      );
    });

  return (
    <>
      <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="text-sm font-medium">Source image</div>
          <Input name="image" accept=".jpg" type="file" onChange={handleChange} />
        </div>

        <div className="w-full md:w-auto">
          <div className="text-sm font-medium">Target resolution</div>
          <Select
            value={selectedResolution}
            onValueChange={(e) => setSelectedResolution(e)}
            defaultValue={selectedResolution}
          >
            <SelectTrigger>
              <SelectValue placeholder="resolution" />
            </SelectTrigger>
            <SelectContent>{selectItems()}</SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="ml-auto whitespace-nowrap"
          disabled={!completedCrop} /* onClick={handleClick} */
        >
          Crop image
        </Button>
      </div>

      {errorMessage && (
        <div className=" justify-end-DEL mt-4 flex w-full items-center text-red-500">{errorMessage}</div>
      )}

      <div className="mt-8 grid grid-cols-1  gap-8 md:grid-cols-2">
        <div>
          <div className="font-medium">
            Original
            {completedCrop && (
              <span className="ml-1 text-sm font-normal">
                (width: {completedCrop.naturalWidth}px, height: {completedCrop.naturalHeight}px)
              </span>
            )}
          </div>
          <div ref={sizeRef}>
            {image ? (
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
                {/* <Image src={image} ref={imageCanvasRef} alt="Crop image" width={rect.width} height={rect.width} /> */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} ref={imageCanvasRef} alt="Crop image" />
              </ReactCrop>
            ) : (
              <PreviewPane label="original" />
            )}
          </div>
        </div>

        <div className="md:flex md:flex-col md:items-end">
          <div className="font-medium">
            Preview
            {completedCrop && (
              <span className="ml-1 text-sm font-normal">
                (width: {completedCrop.naturalSelection}px, height: {completedCrop.naturalSelection}px)
              </span>
            )}
          </div>
          {!!completedCrop ? (
            <div>
              <canvas ref={previewCanvasRef} />
            </div>
          ) : (
            <PreviewPane label="preview" />
          )}
        </div>
      </div>
    </>
  );
}
