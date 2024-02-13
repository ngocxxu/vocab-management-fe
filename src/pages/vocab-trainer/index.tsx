import { AlertDialog } from '@/components/alertDialog';
import Button from '@/components/button';
import HeaderTable from '@/components/headerTable';
import Table from '@/components/table';
import { IconEye, IconTextGrammar, IconTrash } from '@tabler/icons-react';
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { IndeterminateCheckbox } from '../vocab/components/checkbox';
import clsx from 'clsx';
import { TVocabTrainer } from './types';
import { ToolBar } from './components/toolBar';

const data = [
  {
    _id: '1',
    nameTest: 'test1',
    status: 'Passed',
    duration: '20:35',
    updatedAt: '23/12/2018',
    countTime: 1,
    wordResults: [
      {
        numberQuestion: 1,
        userSelect: 'text1',
        systemSelect: 'text2',
      },
      {
        numberQuestion: 2,
        userSelect: 'text3',
        systemSelect: 'text3',
      },
    ],
  },
];

const VocabTrainer = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const counts = Object.keys(rowSelection).length;

  const handleOnYes = (id?: string) => {
    console.log(id);

    if (isDeleteMulti) {
      // Loop find value === true and return [ids]
      // const mappedIds: string[] = Object.entries(rowSelection).map(
      //   ([key, value]) => {
      //     return value ? key : '';
      //   }
      // );
      setRowSelection({});
      // return mutateDeleteMulti(mappedIds);
    }
    // return mutate(id ?? '');
  };

  const columns = useMemo<ColumnDef<TVocabTrainer>[]>(
    () => [
      {
        enableSorting: false,
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: 'nameTest',
        header: 'Name',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
        cell: ({ getValue }) => <>{String(getValue())}s</>,
      },
      {
        accessorKey: 'countTime',
        header: 'Count',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated Date',
      },
      {
        enableSorting: false,
        id: 'action',
        cell: () => (
          <div className='flex gap-3 items-center w-0'>
            <Button
              className='h-6 w-6'
              size='icon'
              variant='ghost'
              leftIcon={
                <IconEye className='text-gray-400 hover:text-gray-500' />
              }
            />
            <Button
              className='h-6 w-6'
              size='icon'
              variant='ghost'
              leftIcon={
                <IconTextGrammar className='text-gray-400 hover:text-gray-500' />
              }
            />
            <AlertDialog
              head={
                <Button
                  className='h-6 w-6'
                  size='icon'
                  variant='ghost'
                  leftIcon={
                    <IconTrash className='text-gray-400 hover:text-gray-500' />
                  }
                />
              }
              title='Do you want to delete?'
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <HeaderTable
      headText='Vocab Trainer'
      bodyText={
        'These are the results of your tests but it is not final, you can do more.'
      }
    >
      <Table
        components={{
          toolbar: (
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
                  <AlertDialog
                    head={
                      <Button
                        onClick={() => setIsDeleteMulti(true)}
                        variant='ghost'
                        title={`Delete (${counts})`}
                        leftIcon={<IconTrash className='mr-2 text-customRed' />}
                      />
                    }
                    title='Do you want to delete these?'
                    onYes={handleOnYes}
                  />
                )}
                <ToolBar
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  idVocabTrainer={''}
                  // mutatePost={mutatePost}
                  // mutatePut={mutatePut}
                />
              </div>
            </div>
          ),
        }}
        isPagination
        paginations={{
          currentPage: 1,
          totalItems: 1,
          totalPages: 1,
        }}
        options={{
          data: data ?? [],
          columns: columns,
          state: {
            rowSelection,
            sorting,
          },
          getSortedRowModel: getSortedRowModel(),
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row._id,
          onSortingChange: setSorting,
        }}
      />
    </HeaderTable>
  );
};

export default VocabTrainer;
