"use client";

import { useState, useEffect } from "react";
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
  onRowClick?: ({ index, row }: RowClick<Row>) => void;
  onSelectRow?: ({ allSelected, selectedIndexes, selectedRows }: SelectRow<Row>) => void;
};

export default function Table<Col, Row>({ columns, rows, onRowClick, onSelectRow }: Props<Row, Col>) {
  const setupButtons = (action: string) => {
    document.querySelectorAll(`.${action}-email-button`).forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = Number(button.getAttribute("data-te-index"));
        console.log(`${action} message: ${index}`,  rows?.[index].id);
      });
    });
  };

  // const setActions = () => {
  //   // document.querySelectorAll(".call-btn").forEach((btn) => {
  //   //   btn.addEventListener("click", () => {
  //   //     console.log(`call ${btn.attributes["data-te-number"].value}`);
  //   //   });
  //   // });

  //   // document.querySelectorAll(".message-btn").forEach((btn) => {
  //   //   btn.addEventListener("click", () => {
  //   //     console.log(`send a message to ${btn.attributes["data-te-email"].value}`);
  //   //   });
  //   // });
  //   setupButtons("star");
  //   setupButtons("delete");
  // };

  // useEffect(() => {
  //   // TODO: Fix TypeScript
  //   window.addEventListener<any>("rowClick.te.datatable", onRowClick);
  //   window.addEventListener<any>("selectRows.te.datatable", onSelectRow);
  //   window.addEventListener("render.te.datatable", setActions);

  //   return () => {
  //     window.removeEventListener<any>("rowClick.te.datatable", onRowClick);
  //     window.removeEventListener<any>("selectRows.te.datatable", onSelectRow);
  //     window.removeEventListener("render.te.datatable", setActions);
  //   };
  // }, []);

  const clickableRows = typeof onRowClick === "function";
  const selectable = typeof onSelectRow === "function";

  const tableOptions = { clickableRows, selectable, striped: true, defaultValue: "" };
  const tableClasses = { striped: `[&:nth-child(odd)]:bg-neutral-100 [&:nth-child(odd)]:dark:bg-neutral-700` };

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });
      new Datatable(document.getElementById("datatable"), { columns, rows }, tableOptions, tableClasses);
    };
    init();
  }, []);

  useEvent("render.te.datatable", () => setupButtons("delete"));

  useEvent("rowClick.te.datatable", onRowClick);

  // window.addEventListener("click", (e) => {e.stopPropagation()});

  // useEffect(() => {
  //   if (!clickableRows) return;
  //   window.addEventListener<any>("rowClick.te.datatable", onRowClick);
  //   return () => {
  //     window.removeEventListener<any>("rowClick.te.datatable", onRowClick);
  //   };
  // }, [onRowClick]);

  useEvent("selectRows.te.datatable", onSelectRow);

  // useEffect(() => {
  //   if (!selectable) return;
  //   window.addEventListener<any>("selectRows.te.datatable", onSelectRow);
  //   return () => {
  //     window.removeEventListener<any>("selectRows.te.datatable", onSelectRow);
  //   };
  // }, [onSelectRow]);

  return <div id="datatable" className="w-full" />;
}
