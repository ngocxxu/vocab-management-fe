import { Table, flexRender } from '@tanstack/react-table';

type TTable<T> = {
  table: Table<T>;
};

const Table = <T,>({ table }: TTable<T>) => {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th scope='col' className='px-6 py-3' key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            className='bg-white dark:bg-gray-800 dark:border-gray-700 border-b'
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <td className='px-6 py-4' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
