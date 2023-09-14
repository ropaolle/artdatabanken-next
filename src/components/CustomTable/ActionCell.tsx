import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface ActionCellProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  onDelete?: (id: string) => void;
  editPath?: string;
}

export function ActionCell<TData>({ row, /* className,  */ onDelete, editPath }: ActionCellProps<TData>) {
  const id = row.getValue<string>("id");

  return (
    <div className="flex justify-end">
      {typeof onDelete === "function" && (
        <a
          role="button"
          title="Delete"
          className="delete-button ms-2 text-neutral-300"
          // data-te-index={id}
          onClick={() => onDelete(id)}
        >
          <Trash2 size={20} />
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
