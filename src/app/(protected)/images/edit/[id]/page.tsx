import { ImageForm } from "@/components/forms";

type Props = {
  // params: { id: string };
  searchParams: { filename: string };
};

export default async function SpeciesAdd({ /* params: { id }, */ searchParams: { filename } }: Props) {
  return (
    <>
      <h1>Update image</h1>
      <div className="max-w-lg2">
        <ImageForm originalFilename={filename} />
      </div>
    </>
  );
}
