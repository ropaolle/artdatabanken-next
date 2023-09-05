// "use client";

// https://github.com/tmm/react-supabase/blob/main/src/hooks/data/use-select.ts

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/database.types";
import { useEffect, useState } from "react";
// import { Database } from 'lucide-react';

export default function useSelect(table: keyof Database["public"]["Tables"]): [any] {
  // const [title, setTitle] = useState<JSX.Element | string>();
  // const [message, setMessage] = useState<JSX.Element | string>();
  // const [promise, setPromise] = useState<{ resolve: (value: unknown) => void } | null>(null);
  const [rows, setRows] = useState<Database["public"]["Tables"][table]["Row"] | null>();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from(table).select();
      setRows(data);
    };

    getData();
  }, []);

  return [rows];
}

// export default function Collections() {

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from('Table').select()
//       setTable(data)
//     }

//     getData()
//   }, [])

//   return (
//     <>
//       <h1>Add species</h1>
//       <div className=" max-w-lg2">
//         <AddSpeciesForm />
//       </div>
//     </>
//   );
// }

// import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// async function getCookieData(): Promise<ReadonlyRequestCookies> {
//   const cookieData = cookies();
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(cookieData);
//     }, 1000),
//   );
// }

// export default async function createServerComponentClientWithCookies() {
//   const tempCookies = await getCookieData();
//   return createServerComponentClient<Database>({ cookies: () => tempCookies });
// }
