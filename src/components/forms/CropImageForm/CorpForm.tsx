"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CropImageForm({
  errorMessage,
  completedCrop,
  handleSubmit,
  selectedResolution,
  setSelectedResolution,
  setSelectedFile,
}: any) {
  const handleChange = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    setSelectedFile(file || null);
  };

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
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500x500">500 * 500 px</SelectItem>
              <SelectItem value="1000x1000">1000 * 1000 px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="ml-auto whitespace-nowrap" disabled={!completedCrop} onClick={handleSubmit}>
          Crop image
        </Button>
      </div>

      {errorMessage && (
        <div className=" justify-end-DEL mt-4 flex w-full items-center text-red-500">{errorMessage}</div>
      )}
    </>
  );
}
