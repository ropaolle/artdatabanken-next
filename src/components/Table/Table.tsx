"use client";

import { useState, useEffect } from "react";
import { runInNewContext } from "vm";

const truncateString = (text: string, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

// TODO: Can't find any Tailwind Elements types
type AsyncTable = { update: (rows: unknown, options: unknown) => void };

const tableOptions = { clickableRows: true, striped: true, selectable: true };
const tableClasses = { striped: `[&:nth-child(odd)]:bg-neutral-100 [&:nth-child(odd)]:dark:bg-neutral-700` };

type RowClick<T> = {
  index: number;
  row: T;
};

type SelectedRow<T> = {
  allSelected: boolean;
  selectedIndexes: number[];
  selectedRows: T[];
};

export default function Table<Col, Row>({ columns, rows }: { columns: Col[]; rows: Row[] | null }) {
  const onRowClick = ({ index, row }: RowClick<Row>) => {
    console.log("onRowClick", index, row);
  };

  const onSelectRow = ({ allSelected, selectedIndexes, selectedRows }: SelectedRow<Row>) => {
    console.log("onSelectRow", selectedIndexes);
  };

  const setupButtons = (action: string) => {
    document.querySelectorAll(`.${action}-email-button`).forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();

        const index = button.getAttribute("data-te-index");

        console.log(`${action} message: ${index}`, rows && index && rows[index].id);
      });
    });
  };

  const setActions = () => {
    // document.querySelectorAll(".call-btn").forEach((btn) => {
    //   btn.addEventListener("click", () => {
    //     console.log(`call ${btn.attributes["data-te-number"].value}`);
    //   });
    // });

    // document.querySelectorAll(".message-btn").forEach((btn) => {
    //   btn.addEventListener("click", () => {
    //     console.log(`send a message to ${btn.attributes["data-te-email"].value}`);
    //   });
    // });
    setupButtons("star");
    setupButtons("delete");
  };

  useEffect(() => {
    window.addEventListener<any>("rowClick.te.datatable", onRowClick);
    window.addEventListener<any>("selectRows.te.datatable", onSelectRow);
    window.addEventListener("render.te.datatable", setActions);

    return () => {
      window.removeEventListener<any>("rowClick.te.datatable", onRowClick);
      window.removeEventListener<any>("selectRows.te.datatable", onSelectRow);
      window.removeEventListener("render.te.datatable", setActions);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });

      if (!rows) return;

      const withButtons = rows.map((row, i) => ({
        ...row,
        url: `
        <div class="flex">
        <a role="button" class="star-email-button text-warning" data-te-index="${i}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </a>
        <a role="button" class="delete-email-button text-neutral-300 ms-2" data-te-index="${i}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </a>
      </div>`,
      }));

      const asyncTable = new Datatable(
        document.getElementById("datatable"),
        { columns, rows: withButtons },
        tableOptions,
        tableClasses
      );
    };
    init();
  }, []);

  return <div id="datatable" className="w-full" />;
}
