"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSpeciesForm from "./AddSpeciesForm";

/* Close dialog button that can be used in a form.

<Close asChild>
  <Button variant="secondary" className="mr-2">
    Cancel
  </Button>
</Close> 
*/

export default function AddSpeciesDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add species</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <AddSpeciesForm />
      </DialogContent>
    </Dialog>
  );
}
