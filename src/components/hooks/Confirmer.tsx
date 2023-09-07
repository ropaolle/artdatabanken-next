"use client";

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
import { Trash2 } from "lucide-react";
import useConfirm from "./useConfirm";

const defaultConfirmLabel = (<><Trash2 className="mr-2 h-4 w-4" />Delete</>);
const defaultCancelLabel = "Cancel";

export default function Confirmer() {
  const { onConfirm, onCancel, confirmState } = useConfirm();

  return (
    <AlertDialog open={confirmState.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmState.title}</AlertDialogTitle>
          {confirmState.message && <AlertDialogDescription>{confirmState.message}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{confirmState.cancelLabel || defaultCancelLabel} </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmState.confirmLabel || defaultConfirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
