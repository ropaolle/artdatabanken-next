import type { /* User as AuthUser, */ SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

type Image = Tables<"images">;
type Species = Tables<"species">;
type SpeciesImage = Prettify<
  Species & { image: { id: string; thumbnail_url: string; filename: string } /*  | null */ }
>;
type User = Tables<"users">;

// type User = Prettify<Pick<AuthUser, "id" | "email" | "role"> & { gravatar: string }> | null;

type Settings = { broadcast: boolean };

type CustomClient = SupabaseClient<Database>;

type BrodcastChannels = "app";
type BrodcastEvents = "*" | "updates";

export type { BrodcastChannels, BrodcastEvents, CustomClient, Image, Prettify, Settings, Species, SpeciesImage, User };

