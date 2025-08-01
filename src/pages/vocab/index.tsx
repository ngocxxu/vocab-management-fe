import { AlertDialog } from '@/components/alertDialog'
import { Badge } from '@/components/badge'
import { Tabs } from '@/components/tabs'
import { InputLib } from '@/components/ui/input'
import { setRowSelectionState } from '@/redux/reducer/vocabTrainer'
import { useRandomVocab } from '@/services/vocab/useRandomVocab'
import { convertOrderBy } from '@/utils'
import {
  IconChevronDown,
  IconChevronUp,
  IconDice6,
  IconEdit,
  IconTrash
} from '@tabler/icons-react'
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import Button from '../../components/button'
import Table from '../../components/table'
import Voice from '../../components/voice'
import { setItemVocabState, toggleState } from '../../redux/reducer/vocab'
import { RootState } from '../../redux/store'
import { useDeleteMultiVocab } from '../../services/vocab/useDeleteMultiVocab'
import { useDeleteVocab } from '../../services/vocab/useDeleteVocab'
import { useGetAllVocab } from '../../services/vocab/useGetAllVocab'
import { usePostVocab } from '../../services/vocab/usePostVocab'
import { usePutVocab } from '../../services/vocab/usePutVocab'
import { PAGE_SIZE_10, ROUTER_VOCAB_TRAINER } from '../../utils/constants'
import { IndeterminateCheckbox } from './components/checkbox'
import { VocabTable } from './components/table/vocabTable'
import { TVocab } from './types'

const Vocab = memo(() => {
  const { pathname } = useLocation()
  const [randomData, setRandomData] = useState<TVocab[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { mutate, isLoading: isLoadingDelete } = useDeleteVocab()
  const { mutate: mutateDeleteMulti, isLoading: isLoadingDeleteMulti } =
    useDeleteMultiVocab()
  const { mutate: mutatePost, isLoading: isLoadingPost } = usePostVocab()
  const { mutate: mutatePut, isLoading: isLoadingPut } = usePutVocab()
  const { mutate: mutateRandom, isLoading: isLoadingRandom } = useRandomVocab({
    onSuccess: ({ items }) => handleResultRandom(items)
  })
  const dispatch = useDispatch()
  const { idsState, itemVocab, filterData, searchVocab, paginationVocabState } =
    useSelector((state: RootState) => state.vocabReducer)
  const { isOpenModalState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )
  const isURLVocabTrainer =
    pathname === ROUTER_VOCAB_TRAINER && isOpenModalState

  const [openModal, setOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [amountRandom, setAmountRandom] = useState(10)
  const [rowSelection, setRowSelection] = useState({})
  const [isDeleteMulti, setIsDeleteMulti] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const refDiv = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useGetAllVocab({
    page:
      isURLVocabTrainer ?
        paginationVocabState.page
      : (searchParams.get('page') ?? '1'),
    pageSize:
      isURLVocabTrainer ?
        paginationVocabState.pageSize
      : (searchParams.get('pageSize') ?? PAGE_SIZE_10),
    sortBy: sorting[0]?.id ?? undefined,
    orderBy: convertOrderBy(sorting),
    subjectFilter: filterData.subject?.map((item) => item.label),
    search: searchVocab || undefined
  })

  const isLoadingAPI =
    isLoadingPost ||
    isLoadingPut ||
    isLoading ||
    isLoadingDelete ||
    isLoadingDeleteMulti ||
    isLoadingRandom

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
    return mutate(id ?? '')
  }

  const handleResultRandom = (data: TVocab[]) => {
    setRandomData(data)

    const ids = data.map((item) => item._id)
    const shuffledIds = [...ids].sort(() => 0.5 - Math.random())
    const random = shuffledIds.slice(0, amountRandom)

    const result = random.reduce<{ [key: string]: boolean }>((obj, key) => {
      obj[key] = true
      return obj
    }, {})

    if (result) {
      setRowSelection(result)
    }
  }
  const handleRandom = () => {
    mutateRandom(amountRandom)
  }

  useEffect(() => {
    if (isURLVocabTrainer) return

    if (data?.items && data?.items.length <= 0 && data.currentPage > 1) {
      setSearchParams({
        page: searchParams.get('page') ?? '1',
        pageSize: searchParams.get('pageSize') ?? PAGE_SIZE_10
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (isURLVocabTrainer) return
    return setSearchParams({
      page: searchParams.get('page') ?? '1',
      pageSize: searchParams.get('pageSize') ?? PAGE_SIZE_10
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isURLVocabTrainer) {
      dispatch(setRowSelectionState(rowSelection))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
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
        size: 1000,
        accessorKey: 'textSource',
        header: 'Text source',
        cell: ({ row, getValue }) => (
          <button
            className="w-full cursor-pointer"
            onClick={() =>
              dispatch(
                toggleState({
                  id: row.original._id
                })
              )
            }
          >
            <div className="flex items-center">
              <p className="font-semibold">{String(getValue())}</p>

              <Voice
                lang={row.original.sourceLanguageCode}
                text={String(getValue())}
              />
            </div>
          </button>
        )
      },
      {
        size: 1000,
        accessorKey: 'textTarget',
        header: 'Text target',
        cell: ({ row }) => (
          <div
            ref={refDiv}
            className="flex cursor-pointer items-center justify-between break-all"
            onClick={() =>
              dispatch(
                toggleState({
                  id: row.original._id
                })
              )
            }
          >
            <div className="flex gap-1">
              {row.original.textTargets.map((item) => {
                return (
                  <Fragment key={item.textTarget}>
                    <Badge variant="outline" className="text-gray-vc-600">
                      {item.textTarget}
                    </Badge>
                  </Fragment>
                )
              })}
            </div>

            {idsState.includes(row.original._id) ?
              <IconChevronUp />
            : <IconChevronDown />}
          </div>
        )
      },
      {
        enableSorting: false,
        accessorKey: 'action',
        id: 'action',
        cell: ({ row }) => (
          <div className="flex w-0 items-center gap-3">
            {!isURLVocabTrainer && (
              <Button
                className="h-6 w-6 gap-0 px-2"
                size="icon"
                variant="ghost"
                onClick={() => {
                  dispatch(setItemVocabState(row.original))
                  setOpenModal(true)
                  setIsEditing(true)
                }}
                leftIcon={
                  <IconEdit className="text-gray-400 hover:text-gray-500" />
                }
              />
            )}
            <AlertDialog
              head={
                <Button
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
    [idsState]
  )

  return (
    <>
      {!isURLVocabTrainer ?
        <VocabTable
          selectionState={{ rowSelection, setRowSelection }}
          sortingState={{ sorting, setSorting }}
          deleteMultiState={{ isDeleteMulti, setIsDeleteMulti }}
          editingState={{ isEditing, setIsEditing }}
          modalState={{ openModal, setOpenModal }}
          isLoading={isLoadingAPI}
          isURLVocabTrainer={isURLVocabTrainer}
          data={data}
          columns={columns}
          idVocab={itemVocab._id}
          handleOnYes={handleOnYes}
          mutatePost={mutatePost}
          mutatePut={mutatePut}
        />
      : <Tabs
          className="mt-4"
          head={[
            {
              content: 'Vocabulary',
              value: 'vocabulary'
            },
            {
              content: 'Random',
              value: 'random'
            }
          ]}
          body={[
            {
              content: (
                <VocabTable
                  selectionState={{ rowSelection, setRowSelection }}
                  sortingState={{ sorting, setSorting }}
                  deleteMultiState={{ isDeleteMulti, setIsDeleteMulti }}
                  editingState={{ isEditing, setIsEditing }}
                  modalState={{ openModal, setOpenModal }}
                  isLoading={isLoadingAPI}
                  isURLVocabTrainer={isURLVocabTrainer}
                  data={data}
                  columns={columns}
                  idVocab={itemVocab._id}
                  handleOnYes={handleOnYes}
                  mutatePost={mutatePost}
                  mutatePut={mutatePut}
                />
              ),
              value: 'vocabulary'
            },
            {
              content: (
                <>
                  <div className="ml-auto mt-5 flex w-full items-center justify-end text-sm font-semibold">
                    {isURLVocabTrainer && (
                      <div className="flex items-center gap-2">
                        <InputLib
                          value={amountRandom}
                          onChange={(e) =>
                            setAmountRandom(Number(e.target.value))
                          }
                          className="w-16"
                          type="number"
                          min={5}
                        />
                        <Button
                          onClick={handleRandom}
                          title="Random"
                          leftIcon={<IconDice6 className="mr-2" />}
                        />
                      </div>
                    )}
                  </div>
                  <div className="my-2">
                    {isURLVocabTrainer && (
                      <Table
                        isScroll
                        isCollapse
                        isLoading={
                          isLoadingPost ||
                          isLoadingPut ||
                          isLoading ||
                          isLoadingDelete ||
                          isLoadingDeleteMulti ||
                          isLoadingRandom
                        }
                        options={{
                          data: randomData ?? [],
                          columns: columns,
                          state: {
                            rowSelection,
                            sorting,
                            columnVisibility: {
                              action: false
                            }
                          },
                          getSortedRowModel: getSortedRowModel(),
                          getCoreRowModel: getCoreRowModel(),
                          onRowSelectionChange: setRowSelection,
                          getRowId: (row) => row._id,
                          onSortingChange: setSorting
                        }}
                      />
                    )}
                  </div>
                </>
              ),
              value: 'random'
            }
          ]}
        />
      }
    </>
  )
})

export default Vocab
