import { create } from "zustand";
// import { persist } from "zustand/middleware";
import { type UserSlice, createUserSlice } from "./userSlice";
import { type SettingsSlice, createSettingsSlice } from "./settingsSlice";
import { type ConfirmSlice, createConfirmSlice } from "./confirmSlice";

type StoreState = ConfirmSlice & UserSlice & SettingsSlice;

export const useAppStore = create<StoreState>()(
  // persist(
  (...a) => ({
    ...createConfirmSlice(...a),
    ...createUserSlice(...a),
    ...createSettingsSlice(...a),
  }),
  // {
  //   name: "thespeciesdb",
  // },
  // ),
);
