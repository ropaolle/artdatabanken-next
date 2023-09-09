import Link from "next/link";

export default function Collections() {
  return (
    <>
      <h1>Collections</h1>
      <Link href="/images/upload" className="mr-4 text-blue-400">
        Upload image
      </Link>
      <Link href="/species/add" className="mr-4 text-blue-400">
        Add species
      </Link>

      <h1>combobox-demo.tsx
</h1>
    </>
  );
}
