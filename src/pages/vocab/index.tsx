import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import {
  Fragment,
  HTMLProps,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/modal';
import Pagination from '../../components/pagination';
import Table from '../../components/table';
import {
  setIdVocabState,
  setItemVocabState,
  toggleState,
} from '../../redux/reducer/vocab';
import { RootState } from '../../redux/store';
import { useDeleteVocab } from '../../services/vocab/useDeleteVocab';
import { useGetAllVocab } from '../../services/vocab/useGetAllVocab';
import { usePostVocab } from '../../services/vocab/usePostVocab';
import FormVocab from './components/form';
import { TOption } from '../../utils/types';
import { usePutVocab } from '../../services/vocab/usePutVocab';

export type TExamples = {
  source: string;
  target: string;
};

export type TTextTarget = {
  text: string;
  wordType: string;
  explanationSource: string;
  explanationTarget: string;
  examples: TExamples[];
  grammar: string;
  subject: TOption[];
};

export type TVocab = {
  _id: string;
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};

const customStyleVocabModal = {
  width: '100%',
  maxWidth: '50vw',
  height: '100%',
  maxHeight: '81vh',
};

const Vocab = () => {
  const { mutate } = useDeleteVocab();
  const { mutate: mutatePost, isLoading: isLoadingPost } = usePostVocab();
  const { mutate: mutatePut, isLoading: isLoadingPut } = usePutVocab();
  const dispatch = useDispatch();
  const { idsState, idVocabState, itemVocab } = useSelector(
    (state: RootState) => state.vocabReducer
  );
  const { data } = useGetAllVocab();
  const [isModal, setIsModal] = useState(false);
  const [isNotifyModal, setIsNotifyModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const refDiv = useRef<HTMLDivElement>(null);

  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
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
        header: 'textSource',
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
            <div className='break-all badge bg-emerald-500 gap-2 text-white'>
              {getValue() as ReactNode}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'textTarget',
        header: 'textTarget',
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
                    <div className='badge bg-sky-500 gap-2 text-white'>
                      {item.text}
                    </div>{' '}
                  </Fragment>
                );
              })}
            </div>

            {idsState.includes(row.original._id) ? (
              <IconArrowBadgeUpFilled />
            ) : (
              <IconArrowBadgeDownFilled />
            )}
          </div>
        ),
      },
      {
        id: 'action',
        cell: ({ row }) => (
          <div className='flex gap-3 items-center w-0'>
            <button
              className='btn btn-square btn-xs btn-outline border-white bg-white'
              onClick={() => {
                dispatch(setItemVocabState(row.original));
                setIsEditing(true);
                setIsModal(!isModal);
              }}
            >
              <IconEdit />
            </button>

            <IconTrash
              className='btn btn-square btn-xs btn-outline border-white bg-white'
              onClick={() => {
                dispatch(setIdVocabState(row.original._id));
                setIsNotifyModal(true);
              }}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idsState, isModal]
  );

  return (
    <div className='container mx-auto -mt-20 bg-white rounded-md p-5 shadow-md mb-10'>
      <div className='flex justify-between items-start'>
        <div>
          <h4 className='font-medium'>Vocabulary list</h4>
          <p className='text-sm mb-6'>
            Let your second world be opened up thanks to the vocabulary list
            below. <br />
            Let's run, don't hesitate!
          </p>
        </div>
        <div>
          <button
            className='btn'
            onClick={() => {
              setIsEditing(false);
              setIsModal(!isModal);
            }}
          >
            Create
          </button>

          <Modal
            custom={customStyleVocabModal}
            isOpen={isModal}
            onClose={() => setIsModal(false)}
            contentLabel={isEditing ? 'Edit' : 'Create'}
            children={
              <FormVocab
                idVocab={itemVocab._id}
                mutate={mutatePost}
                mutatePut={mutatePut}
                isEditing={isEditing}
                onClose={() => setIsModal(false)}
              />
            }
          />

          <Modal
            isOpen={isNotifyModal}
            onClose={() => setIsNotifyModal(false)}
            children={
              <>
                <div className='whitespace-nowrap mb-2'>
                  Do you want to delete?
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <button
                    className='btn btn-active btn-sm'
                    onClick={() => setIsNotifyModal(false)}
                  >
                    No
                  </button>
                  <button
                    className='btn btn-active btn-neutral btn-sm'
                    onClick={() => {
                      setIsNotifyModal(false);
                      mutate(idVocabState);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>

      <Table
        isLoading={isLoadingPost || isLoadingPut}
        data={data ?? []}
        options={{
          data: data ?? [],
          columns: columns,
          getCoreRowModel: getCoreRowModel(),
          state: {
            rowSelection,
          },
          onRowSelectionChange: setRowSelection,
        }}
      />
      <Pagination />
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

export default Vocab;
