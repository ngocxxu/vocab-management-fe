import IconFilter from '@/assets/svg/IconFilter'
import IconFilterRemove from '@/assets/svg/IconFilterRemove'
import Button from '@/components/button'
import { Modal } from '@/components/modal/index'
import { Popover } from '@/components/popover'
import { SearchBar } from '@/components/searchBar'
import { ButtonLib } from '@/components/ui/button'
import { Filter } from '@/pages/vocab/components/filter'
import { setSearchVocabState } from '@/redux/reducer/vocab'
import {
  resetFilterVocabTrainerState,
  setFilterVocabTrainerState,
  setOpenModalState
} from '@/redux/reducer/vocabTrainer'
import { RootState } from '@/redux/store'
import { defaultStatus } from '@/utils/constants'
import { RowSelectionState } from '@tanstack/react-table'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { UseMutateFunction } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { TFormInputsVocabTrainer } from '../../types'
import FormVocabTrainer from '../form'

type TToolbar = {
  idVocabTrainer: string
  mutatePost: UseMutateFunction<
    AxiosResponse,
    unknown,
    TFormInputsVocabTrainer,
    unknown
  >
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  rowSelection: RowSelectionState
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, never>>>
}

export type TFormInputsFilter = {
  status?: string[]
}

export const ToolBar = ({
  mutatePost,
  idVocabTrainer,
  openModal,
  setOpenModal,
  rowSelection,
  setRowSelection
}: TToolbar) => {
  const counts = Object.keys(rowSelection).length
  const { filterData, searchVocabTrainer } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )

  const isClear =
    searchVocabTrainer ||
    counts > 0 ||
    (filterData.status && filterData.status?.length < 3)

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const methods = useForm<TFormInputsFilter>({
    defaultValues: {
      status: filterData.status
    }
  })

  const onSubmit: SubmitHandler<TFormInputsFilter> = data => {
    dispatch(setFilterVocabTrainerState(data))
    setOpen(false)
  }

  return (
    <div className="flex items-center justify-end">
      <FormProvider {...methods}>
        {isClear && (
          <ButtonLib
            className="mr-1"
            variant="outline"
            onClick={() => {
              setRowSelection({})
              dispatch(resetFilterVocabTrainerState())
              methods.setValue('status', defaultStatus)
            }}
          >
            <IconFilterRemove /> Clear all
          </ButtonLib>
        )}
        <Popover
          open={open}
          onOpenChange={setOpen}
          align="end"
          side="bottom"
          head={
            <ButtonLib className="mr-1" variant="ghost">
              <IconFilter /> Filter
            </ButtonLib>
          }
          body={
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Filter onClose={() => setOpen(false)} />
            </form>
          }
          className="w-80"
        />
      </FormProvider>
      <SearchBar
        defaultValue={searchVocabTrainer}
        onSearch={input => dispatch(setSearchVocabState(input))}
      />

      <Modal
        title="Create your test"
        description=" You can create your test by entering the required fields below."
        open={openModal}
        onOpenChange={setOpenModal}
        head={
          <Button
            type="button"
            onClick={() => dispatch(setOpenModalState(true))}
            classNames="ml-3"
            title="+ Add test"
          />
        }
        body={
          <FormVocabTrainer
            idVocabTrainer={idVocabTrainer}
            mutate={mutatePost}
            onClose={() => {
              dispatch(setOpenModalState(true))
              setOpenModal(false)
            }}
          />
        }
        className="w-full max-w-[100vh] max-h-[90vh] overflow-x-auto"
      />
    </div>
  )
}
