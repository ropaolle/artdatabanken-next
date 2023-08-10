"use client";

import { useState, useEffect } from "react";
import { type User } from "@/lib/auth";

type Data = {
  columns: string[];
  rows: string[][];
};

type Data2 = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  // address: string;
  // company: string;
};

const columns = [
  { label: "Address", field: "address" },
  { label: "Company", field: "company" },
  { label: "Email", field: "email" },
  { label: "Name", field: "name" },
  { label: "Phone", field: "phone" },
  { label: "Username", field: "username" },
  { label: "Website", field: "website" },
];

export default function Table({ data }: { data: Data2[] }) {
  const [table, setTable] = useState();

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable });

      // console.count('table');

      // new Datatable(document.getElementById("datatable"), data);

      const asyncTable = new Datatable(document.getElementById("datatable"), { columns }, { loading: true });

      setTable(asyncTable);
    };
    init();
  }, []);

  useEffect(() => {
    table &&
      table.update(
        {
          rows: data.map((user) => ({
            ...user,
            // address: `${user.address.city}, ${user.address.street}`,
            // company: user.company.name,
          })),
        },
        { loading: false }
      );
  }, [table, data]);

  return <div id="datatable" />;
}
