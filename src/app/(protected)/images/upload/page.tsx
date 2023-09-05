import { CropImageForm } from "@/components/forms/CropImageForm";

export default function Upload() {
  return (
    <>
      <h1>Crop and upload image</h1>
      <div className="max-w-[1032px]">
        <CropImageForm />
      </div>
    </>
  );
}
