import { Checkbox } from "@/components/ui/checkbox";
import { type Row, type Table } from "@tanstack/react-table";

export function getCheckboxColumn<TData>(id = "select") {
  return {
    id,
    header: ({ table }: { table: Table<TData> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<TData> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
