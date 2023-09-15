import ImageForm from "@/components/forms/ImageForm";

export default function Upload() {
  return (
    <>
      <h1>Crop and upload image</h1>
      <div className="max-w-[1032px]">
        <ImageForm />
      </div>
    </>
  );
}
