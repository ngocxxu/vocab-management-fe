import IconArrowDown from '@/assets/svg/IconArrowDown';
import IconArrowUp from '@/assets/svg/IconArrowUp';
import { AlertDialog } from '@/components/alertDialog';
import { Badge } from '@/components/badge';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
} from '@tanstack/react-table';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/button';
import Table from '../../components/table';
import Voice from '../../components/voice';
import { setItemVocabState, toggleState } from '../../redux/reducer/vocab';
import { RootState } from '../../redux/store';
import { useDeleteMultiVocab } from '../../services/vocab/useDeleteMultiVocab';
import { useDeleteVocab } from '../../services/vocab/useDeleteVocab';
import { useGetAllVocab } from '../../services/vocab/useGetAllVocab';
import { usePostVocab } from '../../services/vocab/usePostVocab';
import { usePutVocab } from '../../services/vocab/usePutVocab';
import { LIMIT_PAGE_10 } from '../../utils/constants';
import { IndeterminateCheckbox } from './components/checkbox';
import { ToolBar } from './components/toolBar';
import { TVocab } from './types';

const Vocab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, isLoading: isLoadingDelete } = useDeleteVocab();
  const { mutate: mutateDeleteMulti, isLoading: isLoadingDeleteMulti } =
    useDeleteMultiVocab();
  const { mutate: mutatePost, isLoading: isLoadingPost } = usePostVocab();
  const { mutate: mutatePut, isLoading: isLoadingPut } = usePutVocab();
  const dispatch = useDispatch();
  const { idsState, itemVocab, filterData, searchVocab } = useSelector(
    (state: RootState) => state.vocabReducer
  );
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const refDiv = useRef<HTMLDivElement>(null);

  const convertOrderBy = () => {
    if (sorting[0]?.id) {
      return sorting[0]?.desc ? 'desc' : 'asc';
    } else {
      return undefined;
    }
  };

  const { data, isLoading } = useGetAllVocab({
    page: searchParams.get('page') ?? '1',
    limit: searchParams.get('limit') ?? '10',
    sortBy: sorting[0]?.id ?? undefined,
    orderBy: convertOrderBy(),
    subjectFilter: filterData.subject?.map((item) => item.value),
    search: searchVocab || undefined,
  });

  const handleOnYes = (id?: string) => {
    if (isDeleteMulti) {
      // Loop find value === true and return [ids]
      const mappedIds: string[] = Object.entries(rowSelection).map(
        ([key, value]) => {
          return value ? key : '';
        }
      );
      setRowSelection({});
      return mutateDeleteMulti(mappedIds);
    }
    return mutate(id ?? '');
  };

  useEffect(() => {
    if (data?.data && data?.data.length <= 0 && data.currentPage > 1) {
      setSearchParams({
        page: String(data.currentPage - 1),
        limit: LIMIT_PAGE_10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    return setSearchParams({
      page: searchParams.get('page') ?? '1',
      limit: LIMIT_PAGE_10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
        enableSorting: false,
        size: 200,
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
        accessorKey: 'textSource',
        header: 'Text source',
        cell: ({ row, getValue }) => (
          <div
            className='w-full cursor-pointer'
            onClick={() =>
              dispatch(
                toggleState({
                  id: row.original._id,
                })
              )
            }
          >
            <div className='flex items-center'>
              <Badge
                variant='outline'
                className='break-all badge bg-emerald-500 gap-2 text-white'
              >
                {String(getValue())}
              </Badge>

              <Voice
                lang={row.original.sourceLanguage}
                text={String(getValue())}
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'textTarget',
        header: 'Text target',
        cell: ({ row }) => (
          <div
            ref={refDiv}
            className='break-all cursor-pointer flex justify-between items-center'
            onClick={() =>
              dispatch(
                toggleState({
                  id: row.original._id,
                })
              )
            }
          >
            <div>
              {row.original.textTarget.map((item) => {
                return (
                  <Fragment key={item.text}>
                    <Badge
                      variant='outline'
                      className='bg-sky-500 gap-2 text-white'
                    >
                      {item.text}
                    </Badge>{' '}
                  </Fragment>
                );
              })}
            </div>

            {idsState.includes(row.original._id) ? (
              <IconArrowUp />
            ) : (
              <IconArrowDown />
            )}
          </div>
        ),
      },
      {
        enableSorting: false,
        id: 'action',
        cell: ({ row }) => (
          <div className='flex gap-3 items-center w-0'>
            <Button
              className='h-6 w-6'
              size='icon'
              variant='ghost'
              onClick={() => {
                dispatch(setItemVocabState(row.original));
                setOpenModal(true);
                setIsEditing(true);
              }}
              leftIcon={
                <IconEdit className='text-gray-400 hover:text-gray-500' />
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
              onYes={() => handleOnYes(row.original._id)}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idsState]
  );

  return (
    <div className='my-10'>
      <div className='container bg-white mx-auto rounded-md p-5 border shadow-md'>
        <div className='flex justify-between items-start'>
          <div>
            <h4 className='font-medium'>Vocabulary list</h4>
            <p className='text-sm mb-6'>
              Let your second world be opened up thanks to the vocabulary list
              below. <br />
              Let's run, don't hesitate!
            </p>
          </div>
        </div>

        <Table
          isToolbar
          isPagination
          isCollapse
          isLoading={
            isLoadingPost ||
            isLoadingPut ||
            isLoading ||
            isLoadingDelete ||
            isLoadingDeleteMulti
          }
          onConfirmMultiDelete={() => {
            setIsDeleteMulti(true);
          }}
          onYes={handleOnYes}
          paginations={{
            currentPage: data?.currentPage ?? 1,
            totalItems: data?.totalItems ?? 1,
            totalPages: data?.totalPages ?? 1,
          }}
          data={data?.data ?? []}
          options={{
            data: data?.data ?? [],
            columns: columns,
            state: {
              rowSelection,
              sorting,
            },
            getCoreRowModel: getCoreRowModel(),
            onRowSelectionChange: setRowSelection,
            getRowId: (row) => row._id,
            onSortingChange: setSorting,
          }}
          toolbar={
            <ToolBar
              openModal={openModal}
              setOpenModal={setOpenModal}
              idVocab={itemVocab._id}
              mutatePost={mutatePost}
              mutatePut={mutatePut}
              isEditing={isEditing}
              onAddNew={() => {
                setIsEditing(false);
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Vocab;
