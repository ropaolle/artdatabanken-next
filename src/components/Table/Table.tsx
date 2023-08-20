"use client";

import { useState, useEffect, useMemo } from "react";
import useEvent from "./useEvent";

// TODO: Can't find any Tailwind Elements types
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

function setupAction(action: string, func: ((id: string) => void) | undefined) {
  if (typeof func !== "function") return;

  document.querySelectorAll(`.${action}-button`).forEach((button) => {
    button.addEventListener<any>("click", (e) => {
      e.stopPropagation();
      const index = button.getAttribute("data-te-index");
      if (index && index.length) {
        func(index);
      }
    });
  });
}

const tableClasses = {
  striped: `[&:nth-child(odd)]:bg-neutral-100 [&:nth-child(odd)]:dark:bg-neutral-700`,
  // selectableRow: `!bg-yellow-100 dark:!bg-yellow-600`,
  hoverRow: `hover:bg-green-100 dark:hover:bg-green-700`,
  // Right align last th element
  tableHeader: `border-b font-normal px-[1.4rem] [&_tr_th:last-child_div]:flex-row-reverse`,
};

export type RowClick<T> = {
  index: number;
  row: T;
};

export type SelectRow<T> = {
  allSelected: boolean;
  selectedIndexes: number[];
  selectedRows: T[];
};

// TODO: Can't find any Tailwind Elements types
type AsyncTable = { update: (rows: unknown, options?: unknown) => void };

type Props<Row, Col> = {
  columns: Col[];
  rows: Row[];
  hover?: boolean;
  multi?: boolean;
  onRowClick?: ({ index, row }: RowClick<Row>) => void;
  onSelectRow?: ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Row>) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function Table<Col, Row>({
  columns,
  rows,
  hover,
  multi,
  onRowClick,
  onSelectRow,
  onEdit,
  onDelete,
}: Props<Row, Col>) {
  const [table, setTable] = useState<AsyncTable>();
  const clickableRows = typeof onRowClick === "function";
  const selectable = typeof onSelectRow === "function";

  const tableOptions = useMemo(
    () => ({
      clickableRows,
      selectable,
      striped: true,
      defaultValue: "",
      hover: Boolean(hover),
      multi: Boolean(multi),
    }),
    [clickableRows, hover, multi, selectable],
  );

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });
      const table = new Datatable(document.getElementById("datatable"), { columns }, tableOptions, tableClasses);
      setTable(table);
    };

    init();
  }, [columns, tableOptions]);

  useEffect(() => {
    if (!table) return;
    table.update({ rows }, { ...tableOptions });
    setupAction("delete", onDelete);
    setupAction("edit", onEdit);
  }, [table, rows, tableOptions, onDelete, onEdit]);

  useEvent("rowClick.te.datatable", onRowClick);
  useEvent("selectRows.te.datatable", onSelectRow);

  return <div id="datatable" className="w-full" />;
}
