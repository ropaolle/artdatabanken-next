import type { Database } from "./database.types";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

type Image = Tables<"images">;
type Species = Tables<"species">;
type SpeciesImage = Prettify<Species & { image: { id: string; thumbnail_url: string } | null }>;

export type { Prettify, Tables, Species, Image, SpeciesImage };
