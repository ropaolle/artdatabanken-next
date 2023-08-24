import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";

// const useConfirm = () => {

//   const Alert = () => (<div>DUDE!</div>)

//   return Alert
// }

interface ActionCellProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function ActionCell<TData>({ row, /* className,  */ onDelete, onEdit }: ActionCellProps<TData>) {
  const { alert, alertConfirmed, setAlert } = useAppStore();

  const id = row.getValue<string>("id");

  const handleDelete = async (id: string) => {
    if (typeof onDelete === "function") {
      const t = setAlert(true);
      alertConfirmed && onDelete(id);
    }
  };

  return (
    <div className="flex justify-end">
      {typeof onDelete === "function" && (
        <a
          role="button"
          title="Delete"
          className="delete-button ms-2 text-neutral-300"
          data-te-index={id}
          onClick={() => handleDelete(id)}
        >
          <Trash2 size={20} />
        </a>
      )}
      {typeof onEdit === "function" && (
        <a
          role="button"
          title="Edit"
          className="edit-button ms-2 text-neutral-300"
          data-te-index={id}
          onClick={() => onEdit(id)}
        >
          <Pencil size={20} />
        </a>
      )}
    </div>
  );
}
