export default function Loading() {
  const header = (headers: string[]) =>
    headers.map((header, i) => (
      <th key={i} className="py-4 pl-1  text-neutral-400 dark:text-white border-neutral-200 dark:border-neutral-500">
        <div className="flex flex-row group">
          <span className="">{header}</span>
        </div>
      </th>
    ));

  const Row = () => (
    <tr className="border-b border-neutral-200 dark:border-neutral-500 transition ease-in-out duration-300 motion-reduce:transition-none [&amp;:nth-child(odd)]:bg-neutral-50 [&amp;:nth-child(odd)]:dark:bg-neutral-700">
      <td className=" w-3/12 border-neutral-200 dark:border-neutral-500">
        <span className=" inline-block min-h-[1em] w-6/12 flex-auto2 bg-current align-middle opacity-25 rounded py-4"></span>
      </td>
      <td className=" w-7/12  border-neutral-200 dark:border-neutral-500">
        <span className=" inline-block  w-6/12 flex-auto2 bg-current align-middle opacity-25 rounded py-4"></span>
      </td>
      <td className="w-2/12 border-neutral-200 dark:border-neutral-500">
        <div className=" inline-block h-24 w-24 flex-auto2 bg-current align-middle opacity-25 rounded my-4"></div>
      </td>
    </tr>
  );

  return (
    <table className="text-left text-sm font-light w-full leading-[1.6]">
      <thead className="border-b font-normal px-[1.4rem] border-neutral-200 dark:border-neutral-500">
        <tr>{header(["Filename", "URL", "Thumbnail"])}</tr>
      </thead>
      <tbody className="">
        <Row />
        <Row />
        <Row />
        <Row />
      </tbody>
    </table>
  );
}
