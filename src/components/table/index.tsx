import {
  IconArrowsDownUp,
  IconArrowsMoveVertical,
  IconArrowsUpDown,
  IconDatabaseOff,
  IconLoader2,
  IconSchool,
  IconTrash,
} from '@tabler/icons-react';
import {
  TableOptions,
  flexRender,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Fragment, ReactNode, memo } from 'react';
import CollapseVocab from '../../pages/vocab/components/collapse';
import { TPagination } from '../../utils/types';
import { AlertDialog } from '../alertDialog';
import Button from '../button';
import Pagination from '../pagination';
import { TTextTarget } from '@/pages/vocab/types';

type TTable<T extends TExtend> = {
  data: T[];
  options: TableOptions<T>;
  isLoading: boolean;
  isCollapse?: boolean;
  isPagination?: boolean;
  paginations?: TPagination;
  isToolbar?: boolean;
  toolbar?: ReactNode;
  onConfirmMultiDelete?: () => void;
  onYes?: () => void;
};

export type TExtend = {
  _id: string;
  textTarget: TTextTarget[];
  sourceLanguage: string;
  targetLanguage: string;
};

const DataTable = <T extends TExtend>({
  data,
  options,
  isLoading,
  isPagination = false,
  isCollapse = false,
  isToolbar = false,
  paginations,
  onConfirmMultiDelete,
  onYes,
  toolbar,
}: TTable<T>) => {
  const table = useReactTable({
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    ...options,
  });
  const counts = Object.keys(table.getState().rowSelection).length;

  if (isLoading) {
    return (
      <div className='h-[400px] flex justify-center items-center'>
        <IconLoader2 className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  return (
    <>
      {isToolbar && (
        <div
          className={clsx(
            'flex justify-end items-center mb-2',
            counts > 0 && 'justify-between'
          )}
        >
          {counts > 0 && (
            <div className='text-xs'>{counts} row(s) selected</div>
          )}
          <div className='flex justify-center items-center gap-1'>
            {counts > 0 && (
              <Button
                variant='outline'
                title='Practice'
                leftIcon={<IconSchool className='mr-2 text-customBlue' />}
              />
            )}
            {counts > 0 && (
              <AlertDialog
                head={
                  <Button
                    onClick={onConfirmMultiDelete}
                    variant='ghost'
                    title={`Delete (${counts})`}
                    leftIcon={<IconTrash className='mr-2 text-customRed' />}
                  />
                }
                title='Do you want to delete these?'
                onYes={onYes}
              />
            )}
            {toolbar}
          </div>
        </div>
      )}
      {data.length > 0 ? (
        <>
          <table className='table text-sm text-left rtl:text-right text-gray-500 w-full'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, idx) => (
                    <th
                      scope='col'
                      className={clsx(
                        'px-6 py-3',
                        isToolbar && idx === 0 && 'w-2'
                      )}
                      key={header.id}
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
                  {isCollapse && <CollapseVocab row={row} />}
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

const Table = memo(DataTable) as <T extends TExtend>(
  props: TTable<T>
) => ReactNode;

export default Table;
