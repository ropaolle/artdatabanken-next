"use client";

import { CustomTable } from "@/components/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import useConfirm from "@/hooks/useConfirm";
import useDeleteUserMutation from "@/supabase/database/use-delete-user-mutation";
import { useUserQuery } from "@/supabase/database/use-user-query";
import { User } from "@/types/app.types";
import Link from "next/link";
import { getColumns } from "./columns";

const confirmDelete = (user: User) => ({
  title: "Are you absolutely sure?",
  message: (
    <>
      This will permanently delete user <strong>{user?.email}</strong>.
    </>
  ),
});

const AddUserAction = () => (
  <Link href="/users/add" className={buttonVariants({ variant: "default" })}>
    Add user
  </Link>
);

export default function UserTable() {
  const { confirm } = useConfirm();
  const { data: users } = useUserQuery();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const handleDelete = async (user: User) => {
    if (await confirm(confirmDelete(user))) {
      deleteUser(user.id);
    }
  };

  const columns = getColumns({ onDelete: handleDelete, editPath: "/users/edit/" });

  return (
    <>
      <CustomTable columns={columns} data={users || []} actions={<AddUserAction />} />
    </>
  );
}
