"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode, useState } from "react";

export type Resolution = typeof resolutions.w500h500;
type ResolutionKeys = keyof typeof resolutions;

const resolutions = {
  w250h250: { width: 250, height: 250, label: "250 * 250 px" },
  w500h500: { width: 500, height: 500, label: "500 * 500 px" },
  w1000h1000: { width: 1000, height: 1000, label: "1000 * 1000 px" },
};

// file

const getResolution = (resolution: ResolutionKeys) => resolutions[resolution];

export default function Form(
  disabled: boolean,
  onClick: (file: File | undefined, resolution: Resolution) => void,
  errorMessage: ReactNode,
): [() => JSX.Element, File | undefined, typeof resolutions.w500h500] {
  const [file, setFile] = useState<File>();
  const [resolution, setResolution] = useState<ResolutionKeys>("w500h500");

  const handleChange = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    setFile(file);
  };

  const selectItems = () =>
    Object.keys(resolutions).map((id) => {
      const { label } = resolutions[id as keyof typeof resolutions];
      return (
        <SelectItem value={id} key={id}>
          {label}
        </SelectItem>
      );
    });

  const CropForm = () => (
    <>
      <div className="flex flex-col items-end justify-stretch gap-4 space-y-2 md:flex-row md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="text-sm font-medium">Source image</div>
          <Input name="image" accept=".jpg" type="file" onChange={handleChange} />
        </div>

        <div className="w-full md:w-auto">
          <div className="text-sm font-medium">Target resolution</div>
          <Select
            value={resolution}
            onValueChange={(e) => setResolution(e as ResolutionKeys)}
            defaultValue={resolution}
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
          disabled={disabled}
          onClick={() => onClick(file, getResolution(resolution))}
        >
          Crop image
        </Button>
      </div>

      {errorMessage && <div className="justify-end-DEL mt-4 flex w-full items-center text-red-500">{errorMessage}</div>}
    </>
  );

  return [CropForm, file, getResolution(resolution)];
}
