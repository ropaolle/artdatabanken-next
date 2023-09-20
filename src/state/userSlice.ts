import { StateCreator } from "zustand";

type UserState = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  gravatar: string;
} | null;

export interface ConfirmSlice {
  userState: UserState;
  // hideConfirm: () => void;
  // showConfirm: (userState: Omit<UserState, "open">) => void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice, [], [], ConfirmSlice> = (set /* , get */) => ({
  userState: null,
  // hideConfirm: () => set((state) => ({ ...state, userState: { ...state.userState, open: false } })),
  // showConfirm: (userState) => set((state) => ({ ...state, userState: { ...userState, open: true } })),
});
