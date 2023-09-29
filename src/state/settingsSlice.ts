import type { Settings } from "@/types/app.types";
import { StateCreator } from "zustand";

export interface SettingsSlice {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice, [], [], SettingsSlice> = (set /* , get */) => ({
  settings: { broadcast: true },
  setSettings: (settings) => set((state) => ({ ...state, settings })),
});
