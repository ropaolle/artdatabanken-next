import { ImageForm } from "@/components/forms";

type Props = {
  searchParams: { id: string };
};

export default async function UsersEdit({ searchParams: { id } }: Props) {
  return (
    <>
      <h1>Edit user</h1>
      <div className="max-w-lg2">{/* <ImageForm originalFilename={filename}  /> */}</div>
    </>
  );
}
