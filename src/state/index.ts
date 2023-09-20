import { create } from "zustand";
// import { persist } from "zustand/middleware";
import { UserSlice, createUserSlice } from "./userSlice";
import { ConfirmSlice, createConfirmSlice } from "./confirmSlice";

type StoreState = ConfirmSlice & UserSlice ;

export const useAppStore = create<StoreState>()(
  // persist(
    (...a) => ({
      ...createConfirmSlice(...a),
      ...createUserSlice(...a),
    }),
    // {
    //   name: "thespeciesdb",
    // },
  // ),
);
