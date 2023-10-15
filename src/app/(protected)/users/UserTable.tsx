"use client";

import { CustomTable } from "@/components/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import useConfirm from "@/hooks/useConfirm";
import useDeleteUserMutation from "@/supabase/database/use-delete-user-mutation";
import { useUserQuery } from "@/supabase/database/use-user-query";
import { User } from "@/types/app.types";
import Link from "next/link";
import { getColumns } from "./columns";

export default function UserTable() {
  const { confirm } = useConfirm();
  const { data: users } = useUserQuery();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const columns = getColumns({ editPath: "/users/edit/" });

  return (
    <>
      <CustomTable columns={columns} data={users || []} />
    </>
  );
}
