"use client";

import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UseConfirm = {
  title?: ReactNode;
  message?: ReactNode;
  cancelTitle?: ReactNode;
  okTitle?: ReactNode;
};

export default function useConfirm({
  title,
  message,
  okTitle = (
    <>
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </>
  ),
  cancelTitle = "Cancel",
}: UseConfirm): [() => JSX.Element, () => Promise<unknown>, Dispatch<SetStateAction<ReactNode>>] {
  const [localTitle /* , setTitle */] = useState(title);
  const [localMessage, setMessage] = useState(message);
  const [promise, setPromise] = useState<{ resolve: (value: unknown) => void } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <AlertDialog open={promise !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{localTitle}</AlertDialogTitle>
          <AlertDialogDescription>{localMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel()}>{cancelTitle}</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirm()}>{okTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [ConfirmDialog, confirm, setMessage];
}
