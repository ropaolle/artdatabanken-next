export default function Loading() {
  const header = (headers: string[]) =>
    headers.map((header, i) => (
      <th
        key={i}
        className="border-neutral-200 py-4  pl-1 text-neutral-400 dark:border-neutral-500 dark:text-white"
      >
        <div>
          <span className="">{header}</span>
        </div>
      </th>
    ));

  const rows = (count: number) =>
    [...Array(count).keys()].map((_, i) => (
      <tr
        key={i}
        className="border-b border-neutral-200 transition duration-300 ease-in-out motion-reduce:transition-none dark:border-neutral-500 [&:nth-child(odd)]:bg-neutral-50 [&:nth-child(odd)]:dark:bg-neutral-700"
      >
        <td>
          <div className="h-[126px]" />
        </td>
        <td />
        <td />
      </tr>
    ));

  return (
    <table className="w-full">
      <thead className="border-b border-neutral-200 px-[1.4rem] font-normal dark:border-neutral-500">
        <tr>{header(["Filename", "URL", "Thumbnail"])}</tr>
      </thead>
      <tbody>{rows(10)}</tbody>
    </table>
  );
}
