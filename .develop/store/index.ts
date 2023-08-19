import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartSlice, createCartSlice } from "./createCartSlice";
import { ProductSlice, createProductSlice } from "./createProductSlice";

type StoreState = ProductSlice & CartSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createProductSlice(...a),
      ...createCartSlice(...a),
    }),
    {
      name: "thespeciesdb",
    },
  ),
);
