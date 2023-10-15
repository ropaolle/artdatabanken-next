import type { User } from "@/types/app.types";
import { StateCreator } from "zustand";

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set /* , get */) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
});
