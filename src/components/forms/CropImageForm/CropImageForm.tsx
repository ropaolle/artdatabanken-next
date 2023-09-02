"use client";

import { useDebouncedState } from "@/components/hooks/useDebouncedState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import CropPanel, { type CompletedCropArea } from "./CropPanel";

const resolutions = {
  w250h250: { width: 250, height: 250, label: "250 * 250 px" },
  w500h500: { width: 500, height: 500, label: "500 * 500 px" },
  w1000h1000: { width: 1000, height: 1000, label: "1000 * 1000 px" },
};

const handleCrop = async (crop: CompletedCropArea) => {
  console.log("crop", crop);
};

export default function CropImageForm() {
  // const supabase = createClientComponentClient();
  // const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedResolution, setSelectedResolution] = useState("w500h500");
  const [preview, setPreview] = useState<string>();
  const [completedCrop, setCompletedCrop] = useDebouncedState<CompletedCropArea>(null, 200);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  // const imageCanvasRef = useRef<HTMLImageElement>(null);
  // const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null);
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  const handleChange = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    setSelectedFile(file || null);
  };

  const Header = ({ label, width, height }: { label: string; width: number; height: number }) => (
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
        <div className="md:flex md:flex-col">
          <Header label="Original" width={0} height={0} />
          {Boolean(selectedFile) ? (
            <CropPanel file={selectedFile} onCrop={handleCrop} setPreview={setPreview} />
          ) : (
            <PreviewPane label="Original" />
          )}
        </div>

        <div className="md:flex md:flex-col md:items-end">
          <Header label="Preview" width={0} height={0} />
          {Boolean(selectedFile) ? <img src={preview} alt="Preview" /> : <PreviewPane label="Preview" />}
        </div>

        <canvas ref={previewCanvasRef} hidden />
      </div>
    </>
  );
}
