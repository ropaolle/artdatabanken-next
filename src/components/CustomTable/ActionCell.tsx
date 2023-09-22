import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export type Actions<TData> = {
  onDelete?: (id: string) => void;
  onEdit?: (row: TData) => void;
  editPath?: string;
};

type ActionCellProps<TData> = Actions<TData> & { row: Row<TData> };

export function ActionCell<TData>({ row, onDelete, onEdit, editPath }: ActionCellProps<TData>) {
  const id = row.getValue<string>("id");

  return (
    <div className="flex justify-end">
      {typeof onDelete === "function" && (
        <a role="button" title="Delete" className="delete-button ms-2 text-neutral-300" onClick={() => onDelete(id)}>
          <Trash2 size={20} />
        </a>
      )}
      {typeof onEdit === "function" && (
        <a
          role="button"
          title="Edit"
          className="delete-button ms-2 text-neutral-300"
          onClick={() => onEdit(row.original)}
        >
          <Pencil size={20} />
        </a>
      )}
      {editPath && (
        <Link href={`${editPath}/${id}`} className="edit-button ms-2 text-neutral-300">
          <Pencil size={20} />
        </Link>
      )}
    </div>
  );
}
