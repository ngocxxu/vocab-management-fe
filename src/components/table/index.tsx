import {
  IconArrowsDownUp,
  IconArrowsMoveVertical,
  IconArrowsUpDown,
  IconDatabaseOff,
  IconLoader2,
} from '@tabler/icons-react';
import {
  Row,
  TableOptions,
  flexRender,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Fragment, ReactNode, memo } from 'react';
import CollapseVocab, { TExtend } from '../../pages/vocab/components/collapse';
import { TPagination } from '../../utils/types';
import Pagination from '../pagination';

type TTable<T> = {
  data: T[];
  options: TableOptions<T>;
  isLoading?: boolean;
  isCollapse?: boolean;
  isPagination?: boolean;
  paginations?: TPagination;
  components?: {
    toolbar?: ReactNode;
  };
};

const DataTable = <T,>({
  data,
  options,
  isLoading,
  isPagination = false,
  isCollapse = false,
  paginations,
  components,
}: TTable<T>) => {
  const table = useReactTable({
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    ...options,
  });

  if (isLoading) {
    return (
      <div className='h-[400px] flex justify-center items-center'>
        <IconLoader2 className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  return (
    <>
      {components?.toolbar}

      {data.length > 0 ? (
        <>
          <table className='table text-sm text-left rtl:text-right text-gray-500 w-full'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      scope='col'
                      className='px-6 py-3'
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      <div
                        className={clsx(
                          header.column.getCanSort() &&
                            'cursor-pointer select-none flex items-center gap-4'
                        )}
                        onClick={() => header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {{
                          asc: <IconArrowsDownUp size='1rem' />,
                          desc: <IconArrowsUpDown size='1rem' />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() && (
                            <IconArrowsMoveVertical size='1rem' />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr className='bg-white border-b'>
                    {row.getVisibleCells().map((cell) => (
                      <td className='px-6 py-3' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                  {isCollapse && <CollapseVocab row={row as Row<TExtend>} />}
                </Fragment>
              ))}
            </tbody>
          </table>
          {isPagination && <Pagination paginations={paginations!} />}
        </>
      ) : (
        <div className='h-[400px] flex flex-col justify-center items-center gap-2'>
          <IconDatabaseOff size='2rem' />
          <p className='text-xl'>No data found</p>
        </div>
      )}
    </>
  );
};

const Table = memo(DataTable) as <T>(props: TTable<T>) => ReactNode;

export default Table;
