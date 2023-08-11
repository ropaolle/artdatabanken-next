"use client";

import { useState, useEffect } from "react";

// TODO: Can't find any Tailwind Elements types
type AsyncTable = { update: (rows: unknown, options: unknown) => void };

export default function Table<COL, ROW>({ columns, rows }: { columns: COL[]; rows: ROW[] | undefined }) {
  const [table, setTable] = useState<AsyncTable>();

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });

      const asyncTable = new Datatable(document.getElementById("datatable"), { columns }, { loading: false });

      setTable(asyncTable);
    };
    init();
  }, []);

  useEffect(() => {
    table &&
      rows &&
      table.update(
        {
          rows: rows.map((rows) => ({
            ...rows,
            // address: `${rows.address.city}, ${rows.address.street}`,
            // company: rows.company.name,
          })),
        },
        { loading: false, clickableRows: true, striped: true }
      );
  }, [table, rows]);

  return <div id="datatable" />;
}
