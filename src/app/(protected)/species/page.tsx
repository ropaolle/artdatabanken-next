"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { type Database } from "@/lib/database.types";
import Table from "@/components/Table";

export default function Species() {
  const [species, setSpecies] = useState<Database["public"]["Tables"]["species"]["Row"][]>();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("species").select();
      console.log("data", data);
      if (data) setSpecies(data);
    };

    getData();
  }, [supabase]);

  const basicData = {
    columns: ["Name", "Position", "Office", "Age", "Start date", "Salary"],
    rows: [
      ["Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800"],
      ["Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "2012/03/29", "$433,060"],
      ["Airi Satou", "Accountant", "Tokyo", "33", "2008/11/28", "$162,700"],
      ["Brielle Williamson", "Integration Specialist", "New York", "61", "2012/12/02", "$372,000"],
      ["Herrod Chandler", "Sales Assistant", "San Francisco", "59", "2012/08/06", "$137,500"],
      ["Rhona Davidson", "Integration Specialist", "Tokyo", "55", "2010/10/14", "$327,900"],
      ["Colleen Hurst", "Javascript Developer", "San Francisco", "39", "2009/09/15", "$205,500"],
      ["Sonya Frost", "Software Engineer", "Edinburgh", "23", "2008/12/13", "$103,600"],
      ["Jena Gaines", "Office Manager", "London", "30", "2008/12/19", "$90,560"],
      ["Quinn Flynn", "Support Lead", "Edinburgh", "22", "2013/03/03", "$342,000"],
      ["Charde Marshall", "Regional Director", "San Francisco", "36", "2008/10/16", "$470,600"],
      ["Haley Kennedy", "Senior Marketing Designer", "London", "43", "2012/12/18", "$313,500"],
    ],
  };

  const basicData2 = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      // address: {
      //   street: "Kulas Light",
      //   suite: "Apt. 556",
      //   city: "Gwenborough",
      //   zipcode: "92998-3874",
      //   geo: {
      //     lat: "-37.3159",
      //     lng: "81.1496",
      //   },
      // },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      // company: {
      //   name: "Romaguera-Crona",
      //   catchPhrase: "Multi-layered client-server neural-net",
      //   bs: "harness real-time e-markets",
      // },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      // address: {
      //   street: "Victor Plains",
      //   suite: "Suite 879",
      //   city: "Wisokyburgh",
      //   zipcode: "90566-7771",
      //   geo: {
      //     lat: "-43.9509",
      //     lng: "-34.4618",
      //   },
      // },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      // company: {
      //   name: "Deckow-Crist",
      //   catchPhrase: "Proactive didactic contingency",
      //   bs: "synergize scalable supply-chains",
      // },
    },
  ];

  return (
    <>
      {/* <Table data={basicData} /> */}
      <Table data={basicData2} />
      {/* <pre>{JSON.stringify(species, null, 2)}</pre> */}
    </>
  );
}
