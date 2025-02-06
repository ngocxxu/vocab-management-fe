import GroupButton from '@/components/button/GroupButton'
import { Checkbox } from '@/components/checkbox'
import MultiSelect from '@/components/multiselect'
import { Separator } from '@/components/ui/separator'
import { useGetAllVocabSubject } from '@/services/vocabSubject/useGetAllVocabSubject'
import { ROUTER_VOCAB_TRAINER } from '@/utils/constants'
import { TOption } from '@/utils/types'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { statusList, subjectList } from '../../constants'

type TFilter = {
  onClose: () => void
}

export const Filter = ({ onClose }: TFilter) => {
  const [items, setItems] = useState<TOption[]>([])
  const { control } = useFormContext()
  const { pathname } = useLocation()
  const isURLVocabTrainer = pathname === ROUTER_VOCAB_TRAINER
  const { data: dataVocabSubject } = useGetAllVocabSubject()

  useEffect(() => {
    if (dataVocabSubject && dataVocabSubject?.data.length > 0) {
      const newData = dataVocabSubject.data.map((item) => ({
        value: item._id,
        label: item.name
      }))
      setItems(newData)
    }
  }, [dataVocabSubject])

  return (
    <div className="flex flex-col gap-3">
      {!isURLVocabTrainer && (
        <div>
          <p className="mb-2">Subject</p>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <MultiSelect options={subjectList} {...field} />
            )}
          />
        </div>
      )}

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

      <Separator className="my-2" />
      <div className="mr-16 flex items-center justify-end">
        <GroupButton variantNo="ghost" onClose={onClose} />
      </div>
    </div>
  )
}
