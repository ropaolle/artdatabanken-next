"use client";

import { SpeciesForm } from "@/components/forms";

export default function SpeciesAdd({ params }: { params: { id: string } }) {
  return (
    <>
      <h1>Edit species</h1>
      <div className=" max-w-lg2">
        <SpeciesForm id={params.id} />
      </div>
    </>
  );
}
