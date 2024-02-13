import {
  IconCaretDownFilled,
  IconCaretUpDownFilled,
  IconCaretUpFilled,
  IconDatabaseOff,
  IconLoader2,
} from '@tabler/icons-react';
import {
  TableOptions,
  flexRender,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, ReactNode, memo } from 'react';
import CollapseVocab from '../../pages/vocab/components/collapse';
import { TPagination } from '../../utils/types';
import Pagination from '../pagination';

type TTable<T> = {
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

      {options.data.length > 0 ? (
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
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-4'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {{
                          asc: <IconCaretUpFilled size='0.8rem' />,
                          desc: <IconCaretDownFilled size='0.8rem' />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() && (
                            <IconCaretUpDownFilled size='0.8rem' />
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
                  {isCollapse && <CollapseVocab row={row as never} />}
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
