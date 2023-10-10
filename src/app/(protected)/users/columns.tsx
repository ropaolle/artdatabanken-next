import { ActionCell, DataTableColumnHeader, getCheckboxColumn, type Actions } from "@/components/CustomTable";
import type { User } from "@/types/app.types";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

const columnHelper = createColumnHelper<User>();

export const getColumns = (actions: Actions<User>) => {
  return [
    columnHelper.display(getCheckboxColumn()),

    columnHelper.accessor("id", { header: "Id" }),

    columnHelper.accessor("gravatar", {
      header: "Gravatar",
      cell: (info) => {
        const url = info.getValue();
        return <Image src={url} alt="image" width="40" height="40" loading="lazy" />;
      },
    }),

    columnHelper.accessor("email", { header: ({ column }) => <DataTableColumnHeader column={column} title="Email" /> }),

    columnHelper.accessor("created_at", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),

    columnHelper.accessor("updated_at", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),

    columnHelper.accessor("last_sign_in_at", {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last sign in at" />,
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} {...actions} />,
    }),
  ];
};
