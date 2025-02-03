import { AlertDialog } from '@/components/alertDialog'
import { Badge } from '@/components/badge'
import Button from '@/components/button'
import HeaderTable from '@/components/headerTable'
import { Loader } from '@/components/loader'
import { Modal } from '@/components/modal'
import Table from '@/components/table'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { setItemVocabTrainerState } from '@/redux/reducer/vocabTrainer'
import { RootState } from '@/redux/store'
import { VOCAB_TRAINER_KEYS } from '@/services/vocabTrainer/queryKeys'
import { useDeleteMultiVocabTrainer } from '@/services/vocabTrainer/useDeleteMultiVocabTrainer'
import { useDeleteVocabTrainer } from '@/services/vocabTrainer/useDeleteVocabTrainer'
import { useGetAllVocabTrainer } from '@/services/vocabTrainer/useGetAllVocabTrainer'
import { usePostQuestion } from '@/services/vocabTrainer/usePostQuestion'
import { usePostVocabTrainerModal } from '@/services/vocabTrainer/usePostVocabTrainerModal'
import { convertOrderBy } from '@/utils'
import {
  LIMIT_PAGE_10,
  ROUTER_VOCAB_TRAINER,
  colorData
} from '@/utils/constants'
import { IconEye, IconTextGrammar, IconTrash } from '@tabler/icons-react'
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { memo, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import { IndeterminateCheckbox } from '../vocab/components/checkbox'
import { DetailTable } from './components/detailTable'
import { ToolBar } from './components/toolBar'
import { TVocabTrainer } from './types'

const VocabTrainer = memo(() => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const client = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [isDeleteMulti, setIsDeleteMulti] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const { mutate: mutatePost, isLoading: isLoadingPost } =
    usePostVocabTrainerModal({
      onSuccess: () => {
        client.invalidateQueries([VOCAB_TRAINER_KEYS.GET_ALL_VOCAB_TRAINER])
        toast({
          title: 'Success',
          description: 'Created successfully'
        })
        setOpenModal(false)
      }
    })

  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteVocabTrainer()
  const { mutate: mutateDeleteMulti, isLoading: isLoadingDeleteMulti } =
    useDeleteMultiVocabTrainer()
  const { mutate: mutateQuestion, isLoading: isLoadingQuestion } =
    usePostQuestion()

  const counts = Object.keys(rowSelection).length
  const { isOpenModalState, searchVocabTrainer, filterData, itemVocabTrainer } =
    useSelector((state: RootState) => state.vocabTrainerReducer)

  const { data, isLoading } = useGetAllVocabTrainer({
    page: searchParams.get('page') ?? '1',
    limit: searchParams.get('limit') ?? LIMIT_PAGE_10,
    sortBy: sorting[0]?.id ?? undefined,
    orderBy: convertOrderBy(sorting),
    statusFilter: filterData.status ?? [],
    search: searchVocabTrainer || undefined
  })
  const isURLVocabTrainer =
    pathname === ROUTER_VOCAB_TRAINER && isOpenModalState

  const handleOnYes = (id?: string) => {
    if (isDeleteMulti) {
      // Loop find value === true and return [ids]
      const mappedIds: string[] = Object.entries(rowSelection).map(
        ([key, value]) => {
          return value ? key : ''
        }
      )
      setRowSelection({})
      return mutateDeleteMulti(mappedIds)
    }
    return mutateDelete(id ?? '')
  }

  useEffect(() => {
    if (isURLVocabTrainer) return
    return setSearchParams({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? LIMIT_PAGE_10
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useMemo<ColumnDef<TVocabTrainer>[]>(
    () => [
      {
        size: 0,
        enableSorting: false,
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        accessorKey: 'nameTest',
        header: 'Name'
      },
      {
        accessorKey: 'statusTest',
        header: 'Status',
        cell: ({ getValue }) => {
          const findColor = colorData.find((item) => item.status === getValue())
          return (
            <Badge
              className="w-[4rem]"
              style={{
                backgroundColor: findColor?.background,
                color: findColor?.text
              }}
            >
              {String(getValue())}
            </Badge>
          )
        }
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
        cell: ({ getValue }) => getValue() + 's'
      },
      {
        accessorKey: 'countTime',
        header: 'Count'
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated Date',
        cell: ({ getValue }) =>
          format(new Date(String(getValue())), 'dd/MM/yyyy')
      },
      {
        enableSorting: false,
        id: 'action',
        cell: ({ row }) => (
          <div className="flex w-0 items-center gap-2">
            <Button
              type="button"
              onClick={() => {
                dispatch(setItemVocabTrainerState(row.original))
                setOpenDetailModal(true)
              }}
              className="h-6 w-6 gap-0 px-2"
              size="icon"
              variant="ghost"
              leftIcon={
                <IconEye className="text-gray-400 hover:text-gray-500" />
              }
            />

            <Button
              type="button"
              onClick={() => {
                mutateQuestion(row.original._id)
              }}
              className="h-6 w-6 gap-0 px-2"
              size="icon"
              variant="ghost"
              leftIcon={
                <IconTextGrammar className="text-gray-400 hover:text-gray-500" />
              }
            />
            <AlertDialog
              head={
                <Button
                  type="button"
                  className="h-6 w-6 gap-0 px-2"
                  size="icon"
                  variant="ghost"
                  leftIcon={
                    <IconTrash className="text-gray-400 hover:text-gray-500" />
                  }
                />
              }
              onYes={() => handleOnYes(row.original._id)}
            />
          </div>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (isLoadingQuestion) {
    return <Loader />
  }

  return (
    <HeaderTable
      headText="Vocab Trainer"
      bodyText={
        'These are the results of your tests but it is not final, you can do more.'
      }
    >
      <Table
        components={{
          toolbar: (
            <div
              className={cn(
                'mb-2 flex items-center justify-end',
                counts > 0 && 'justify-between'
              )}
            >
              {counts > 0 && (
                <div className="text-xs">{counts} row(s) selected</div>
              )}
              <div className="flex items-center justify-center gap-1">
                {counts > 0 && (
                  <AlertDialog
                    head={
                      <Button
                        type="button"
                        onClick={() => setIsDeleteMulti(true)}
                        variant="ghost"
                        title={`Delete (${counts})`}
                        leftIcon={<IconTrash className="mr-2 text-error" />}
                      />
                    }
                    title="Do you want to delete these?"
                    onYes={handleOnYes}
                  />
                )}
                <ToolBar
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  idVocabTrainer={''}
                  mutatePost={mutatePost}
                  isLoadingPost={isLoadingPost}
                />
              </div>
            </div>
          )
        }}
        isLoading={isLoading || isLoadingDelete || isLoadingDeleteMulti}
        isPagination
        paginations={{
          currentPage: data?.currentPage ?? 1,
          totalItems: data?.totalItems ?? 1,
          totalPages: data?.totalPages ?? 1
        }}
        options={{
          data: data?.data ?? [],
          columns: columns,
          state: {
            rowSelection,
            sorting
          },
          getSortedRowModel: getSortedRowModel(),
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row._id,
          onSortingChange: setSorting
        }}
      />
      <Modal
        title="Result Detail"
        description="Here are details about your test results latest."
        open={openDetailModal}
        onOpenChange={setOpenDetailModal}
        body={<DetailTable data={itemVocabTrainer.wordResults} />}
        className="!max-h-[85vh] w-full max-w-[100vh] overflow-x-auto"
      />
    </HeaderTable>
  )
})

export default VocabTrainer
