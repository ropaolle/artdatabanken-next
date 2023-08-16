export default function Loading() {
  const header = (headers: string[]) =>
    headers.map((header, i) => (
      <th key={i} className="py-4 pl-1  text-neutral-400 dark:text-white border-neutral-200 dark:border-neutral-500">
        <div>
          <span className="">{header}</span>
        </div>
      </th>
    ));

  const rows = (count: number) =>
    [...Array(count).keys()].map((_, i) => (
      <tr
        key={i}
        className="border-b border-neutral-200 dark:border-neutral-500 transition ease-in-out duration-300 motion-reduce:transition-none [&amp;:nth-child(odd)]:bg-neutral-50 [&amp;:nth-child(odd)]:dark:bg-neutral-700"
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
      <thead className="border-b font-normal px-[1.4rem] border-neutral-200 dark:border-neutral-500">
        <tr>{header(["Filename", "URL", "Thumbnail"])}</tr>
      </thead>
      <tbody>{rows(10)}</tbody>
    </table>
  );
}
