import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

interface ActionCellProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
}

export function ActionCell<TData>({ row, className }: ActionCellProps<TData>) {
  const id = row.getValue<string>("id");

  return (
    <div className="flex justify-end">
      <a role="button" title="Delete" className="delete-button ms-2 text-neutral-300" data-te-index={id}>
        <Trash2 size={20} />
      </a>
      <a role="button" title="Edit" className="edit-button ms-2 text-neutral-300" data-te-index={id}>
        <Pencil size={20} />
      </a>
    </div>
  );
}
