import { ReactNode } from "react";
import { StateCreator } from "zustand";

type ConfirmState = {
  open: boolean;
  title: ReactNode;
  message?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
};

export interface ConfirmSlice {
  confirmState: ConfirmState;
  hideConfirm: () => void;
  showConfirm: (confirmState: Omit<ConfirmState, "open">) => void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice, [], [], ConfirmSlice> = (set /* , get */) => ({
  confirmState: {
    open: false,
    title: "{title}",
    // message: "",
    // confirmLabel: "",
    // cancelLabel: "",
  },
  hideConfirm: () => set((state) => ({ ...state, confirmState: { ...state.confirmState, open: false } })),
  showConfirm: (confirmState) => set((state) => ({ ...state, confirmState: { ...confirmState, open: true } })),
});
