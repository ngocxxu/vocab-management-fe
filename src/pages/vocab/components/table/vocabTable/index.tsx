import { AlertDialog } from '@/components/alertDialog'
import Button from '@/components/button'
import Table from '@/components/table'
import { cn } from '@/lib/utils'
import { TCreateVocab, TVocab } from '@/pages/vocab/types'
import { TPutVocabs } from '@/services/vocab/usePutVocab'
import { ResponseAPI } from '@/utils/types'
import { IconTrash } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState
} from '@tanstack/react-table'
import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { UseMutateFunction } from 'react-query'
import { ToolBar } from '../../toolBar'

type TVocabTable = {
  isLoading: boolean
  isURLVocabTrainer: boolean
  idVocab: string
  handleOnYes: () => void
  data?: ResponseAPI<TVocab[]>
  columns: ColumnDef<TVocab>[]
  selectionState: {
    rowSelection: RowSelectionState
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
  }
  sortingState: {
    sorting: SortingState
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  }
  deleteMultiState: {
    isDeleteMulti?: boolean
    setIsDeleteMulti: React.Dispatch<React.SetStateAction<boolean>>
  }
  editingState: {
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  }
  modalState: {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  }
  mutatePost: UseMutateFunction<
    AxiosResponse,
    unknown,
    TCreateVocab,
    unknown
  >
  mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>
}

export const VocabTable = ({
  selectionState,
  sortingState,
  deleteMultiState,
  editingState,
  modalState,
  isLoading,
  isURLVocabTrainer,
  data,
  columns,
  idVocab,
  handleOnYes,
  mutatePost,
  mutatePut
}: TVocabTable) => {
  const { rowSelection, setRowSelection } = selectionState
  const { sorting, setSorting } = sortingState
  const { setIsDeleteMulti } = deleteMultiState
  const { isEditing, setIsEditing } = editingState
  const { openModal, setOpenModal } = modalState
  const counts = Object.keys(rowSelection).length

  return (
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
              {counts > 0 && !isURLVocabTrainer && (
                <AlertDialog
                  head={
                    <Button
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
                setRowSelection={
                  setRowSelection as Dispatch<
                    SetStateAction<Record<string, never>>
                  >
                }
                openModal={openModal}
                setOpenModal={setOpenModal}
                idVocab={idVocab}
                mutatePost={mutatePost}
                mutatePut={mutatePut}
                isEditing={isEditing}
                onAddNew={() => {
                  setIsEditing(false)
                }}
                tableData={data?.items ?? []}
              />
            </div>
          </div>
        )
      }}
      isScroll={isURLVocabTrainer}
      isPagination
      isCollapse
      isLoading={isLoading}
      paginations={{
        currentPage: data?.currentPage ?? 1,
        totalItems: data?.totalItems ?? 1,
        totalPages: data?.totalPages ?? 1
      }}
      options={{
        data: data?.items ?? [],
        columns: columns,
        state: {
          rowSelection,
          sorting
        },
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => row.id,
        onSortingChange: setSorting
      }}
    />
  )
}
