import type { User } from "@/types/app.types";
import { StateCreator } from "zustand";

export interface UserSlice {
  user: User;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set /* , get */) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
});
