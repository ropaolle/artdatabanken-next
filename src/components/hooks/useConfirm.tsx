"use client";

import { useAppStore } from "@/state";

let resolveCallback: (value: unknown) => void;

export default function useConfirm() {
  const { showConfirm, hideConfirm, confirmState } = useAppStore();

  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };

  const confirm = (state: Omit<typeof confirmState, "open">) => {
    showConfirm(state);

    return new Promise((resolve /* , reject */) => {
      resolveCallback = resolve;
    });
  };

  const closeConfirm = () => {
    hideConfirm();
  };

  return { confirm, onConfirm, onCancel, confirmState };
}
