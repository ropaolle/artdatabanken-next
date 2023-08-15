// "use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { type Database } from "@/lib/database.types";
import Table from "@/components/Table";
import { getItems } from "./getItems";

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

type Column = { label: string; field: string };

export const revalidate = 5;

const columns = [
  // created_at
  // updated_at
  // { label: "Id", field: "id" },
  // { label: "User Id", field: "id" },
  { label: "Filename", field: "filename" },
  { label: "URL", field: "url" },
  { label: "Thumbnail URL", field: "thumbnail_url" },
];

type Images = Database["public"]["Tables"]["images"]["Row"];

const truncateString = (text: string | null, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

export default async function Images() {
  // const supabase = createClientComponentClient<Database>();
  // const { data, count } = await supabase.from("images").select('*', { count: 'exact'/* , head: true  */}).limit(1);

  const data = await getItems('a')

  
  // await sleep(2000);

  // console.log('count', count);

  console.log('data', data && data.length);

  // data?.push({})
  // data?.push({})
  // data?.push({})
  // data?.push({})

  // console.log("data", data?.length);

  // // if (!data) return null;

  // const rows: Images[] = data.map((row) => ({
  //   ...row,
  //   url: `<div class="h-24">${truncateString(row.url, 36)}</div>`,
  //   thumbnail_url: `<img src="${row?.thumbnail_url}" alt="image" />`,
  //   // thumbnail_url: `<img src="https://firebasestorage.googleapis.com/v0/b/artdatabanken-2023.appspot.com/o/thumbs%2Fimage559.jpg?alt=media&token=de29369a-5e1a-47c6-a3ec-2ffe20ca4b2c" alt="image" height="98" width="98" loading="lazy" />`,
  //   // thumbnail_url: `<img src="/bird.svg" alt="image" height="98" width="98" loading="lazy" />`,
  //   // address: `${rows.address.city}, ${rows.address.street}`,
  //   // company: rows.company.name,
  // }));

  // if (data) setImages(data);

  // }

  // loadData()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase.from("images").select();

  //     await sleep(2000);

  //     if (data) setImages(data);
  //   };

  //   getData();
  // }, [supabase]);

  // console.log("images", data);
  // if (!data) return null;

  // if (!rows || rows.length === 0) return null;
  // return <div>OLLE</div>

  return <Table<Column, Images> rows={data} columns={columns} />;
}
