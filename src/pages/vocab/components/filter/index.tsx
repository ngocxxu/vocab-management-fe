import GroupButton from '@/components/button/GroupButton'
import { Checkbox } from '@/components/checkbox'
import Select from '@/components/select'
import { Separator } from '@/components/ui/separator'
import { RootState } from '@/redux/store'
import { useGetAllVocabSubject } from '@/services/vocabSubject/useGetAllVocabSubject'
import { ROUTER_VOCAB_TRAINER } from '@/utils/constants'
import { TOption } from '@/utils/types'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { questionTypeList, statusList } from '../../constants'
import MultiSelect from '@/components/multiselect'

type TFilter = { onClose: () => void }

export const Filter = ({ onClose }: TFilter) => {
  const [items, setItems] = useState<TOption[]>([])
  const { control } = useFormContext()
  const { pathname } = useLocation()
  const isURLVocabTrainer = pathname === ROUTER_VOCAB_TRAINER
  const { data: dataVocabSubject } = useGetAllVocabSubject()
  const { isOpenModalState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )

  useEffect(() => {
    if (dataVocabSubject && dataVocabSubject?.items.length > 0) {
      const newData = dataVocabSubject.items.map((item) => ({
        value: item.id,
        label: item.name
      }))
      setItems(newData)
    }
  }, [dataVocabSubject])

  return (
    <div className="flex flex-col gap-3">
      {(isOpenModalState || !isURLVocabTrainer) && (
        <div>
          <p className="mb-2">Subject</p>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => <MultiSelect options={items} {...field} />}
          />
        </div>
      )}

      {(isOpenModalState || isURLVocabTrainer) && (
        <>
          <div>
            <p className="mb-2">Question Type</p>
            <Controller
              name="questionType"
              control={control}
              render={({ field }) => (
                <Select options={questionTypeList} {...field} />
              )}
            />
          </div>

          <div>
            <p className="mb-2">Status</p>
            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                return (
                  <div className="flex items-center justify-between">
                    {statusList.map(({ label, value }) => (
                      <Fragment key={label}>
                        <Checkbox
                          checked={field.value?.includes(value)}
                          onCheckedChange={(checked) => {
                            return checked ?
                                field.onChange(
                                  field.value && [...field.value, value]
                                )
                              : field.onChange(
                                  field.value?.filter(
                                    (val: string) => val !== value
                                  )
                                )
                          }}
                          label={label}
                          {...field}
                        />
                      </Fragment>
                    ))}
                  </div>
                )
              }}
            />
          </div>
        </>
      )}

      <Separator className="my-2" />
      <div className="mr-16 flex items-center justify-end">
        <GroupButton variantNo="ghost" onClose={onClose} />
      </div>
    </div>
  )
}
