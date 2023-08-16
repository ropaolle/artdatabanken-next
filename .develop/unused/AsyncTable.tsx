"use client";

import { useState, useEffect } from "react";

const truncateString = (text: string, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

// TODO: Can't find any Tailwind Elements types
type AsyncTable = { update: (rows: unknown, options: unknown) => void };

const tableOptions = { /* loading: false, */ clickableRows: true, striped: true };

export default function AsyncTable<COL, ROW>({ columns, rows }: { columns: COL[]; rows: ROW[] | null }) {
  const [table, setTable] = useState<AsyncTable>();

  useEffect(() => {
    const init = async () => {
      // if (!rows) return;
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });

      const asyncTable = new Datatable(document.getElementById("datatable"), { columns /* , rows */ }, tableOptions, {
        striped: `[&:nth-child(odd)]:bg-neutral-200 [&:nth-child(odd)]:dark:bg-neutral-700`,
      });

      setTable(asyncTable);
    };
    init();
  }, []);

  // console.log('rows', rows);

  useEffect(() => {
    table &&
      rows &&
      table.update(
        {
          rows: rows.map((rows) => ({
            ...rows,
            url: `<div class="h-24">${truncateString(rows.url, 36)}</div>`,
            // thumbnail_url: `<img src="${rows.thumbnail_url}" alt="image" />`,
            // thumbnail_url: `<img src="https://firebasestorage.googleapis.com/v0/b/artdatabanken-2023.appspot.com/o/thumbs%2Fimage559.jpg?alt=media&token=de29369a-5e1a-47c6-a3ec-2ffe20ca4b2c" alt="image" height="98" width="98" loading="lazy" />`,
            thumbnail_url: `<img src="/bird.svg" alt="image" height="98" width="98" loading="lazy" />`,
            // address: `${rows.address.city}, ${rows.address.street}`,
            // company: rows.company.name,
          })),
        },
        tableOptions
      );
  }, [table]);

  return <div id="datatable" className="w-full" />;
}
