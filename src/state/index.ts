import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { CartSlice, createCartSlice } from "./createCartSlice";
import { ConfirmSlice, createConfirmSlice } from "./confirmSlice";

type StoreState = ConfirmSlice /* & CartSlice */;

export const useAppStore = create<StoreState>()(
  // persist(
    (...a) => ({
      ...createConfirmSlice(...a),
      // ...createCartSlice(...a),
    }),
    // {
    //   name: "thespeciesdb",
    // },
  // ),
);
