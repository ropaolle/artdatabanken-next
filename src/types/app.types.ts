import type { Database } from "./database.types";
import type { User as AuthUser } from "@supabase/auth-helpers-nextjs";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

type Image = Tables<"images">;
type Species = Tables<"species">;
type SpeciesImage = Prettify<Species & { image: { id: string; thumbnail_url: string } | null }>;

type User = Prettify<Pick<AuthUser, "id" | "email" | "role"> & { gravatar: string }> | null;

export type { Prettify, Tables, Species, Image, SpeciesImage, User };
