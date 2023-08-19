"use client";

import { useEffect } from "react";
import useEvent from "./useEvent";

// TODO: Can't find any Tailwind Elements types
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export type RowClick<T> = {
  index: number;
  row: T;
};

export type SelectRow<T> = {
  allSelected: boolean;
  selectedIndexes: number[];
  selectedRows: T[];
};

type Props<Row, Col> = {
  columns: Col[];
  rows: Row[];
  hover?: boolean;
  multi?: boolean;
  onRowClick?: ({ index, row }: RowClick<Row>) => void;
  onSelectRow?: ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Row>) => void;
};

export default function Table<Col, Row>({ columns, rows, hover, multi, onRowClick, onSelectRow }: Props<Row, Col>) {
  const clickableRows = typeof onRowClick === "function";
  const selectable = typeof onSelectRow === "function";

  useEffect(
    () => {
      const tableOptions = {
        clickableRows,
        selectable,
        striped: true,
        defaultValue: "",
        hover: Boolean(hover),
        multi: Boolean(multi),
      };

      const tableClasses = {
        striped: `[&:nth-child(odd)]:bg-neutral-100 [&:nth-child(odd)]:dark:bg-neutral-700`,
        // selectableRow: `!bg-yellow-100 dark:!bg-yellow-600`,
        hoverRow: `hover:bg-green-100 dark:hover:bg-green-700`,
        // Right align last th element
        tableHeader: `border-b font-normal px-[1.4rem] [&_tr_th:last-child_div]:flex-row-reverse`,
      };

      const init = async () => {
        const { Datatable, initTE } = await import("tw-elements");
        initTE({ Datatable });
        new Datatable(document.getElementById("datatable"), { columns, rows }, tableOptions, tableClasses);
      };
      init();
    },
  );

  useEvent("rowClick.te.datatable", onRowClick);
  useEvent("selectRows.te.datatable", onSelectRow);

  return <div id="datatable" className="w-full" />;
}
