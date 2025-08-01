import Button from '@/components/button'
import { cn } from '@/lib/utils'
import { TOption } from '@/utils/types'
import { IconPlus, IconX } from '@tabler/icons-react'
import { memo } from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  useFieldArray
} from 'react-hook-form'
import { TFormInputsVocab } from '..'
import Input from '../../../../../components/input'
import MultiSelect from '../../../../../components/multiselect'
import Select from '../../../../../components/select'
import { ExamplesForm } from '../examples'
import { useGetAllWordTypes } from '@/services/wordType'

type TTextTargetsForm = {
  index: number
  control: Control<TFormInputsVocab>
  errors: FieldErrors<TFormInputsVocab>
  subjects: TOption[]
}

export const TextTargetsForm = memo(
  ({ index, control, errors, subjects }: TTextTargetsForm) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: `textTargets.${index}.vocabExamples`
    })
    const checkErrors = Object.keys(errors).length > 0
    const { data: wordTypes } = useGetAllWordTypes()



    return (
      <>
        <div className="flex items-center justify-center gap-2">
          <Controller
            name={`textTargets.${index}.textTarget`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                error={checkErrors ? errors.textTargets![index]?.textTarget : null}
                isMark={true}
                label="Text target"
                placeholder="Type here"
                {...field}
              />
            )}
          />
          <Controller
            name={`textTargets.${index}.wordType`}
            control={control}
            render={({ field }) => (
              <Select
                label="Word type"
                options={[
                  { value: '', label: 'Select word type' },
                  ...(wordTypes?.items?.map((wordType) => ({
                    value: wordType.id,
                    label: wordType.name
                  })) || [])
                ]}
                onChange={(selectedValue) => {
                  if (selectedValue && selectedValue !== '') {
                    field.onChange({
                      id: selectedValue
                    })
                  } else {
                    field.onChange({
                      id: '',
                    })
                  }
                }}
                value={field.value?.id || ''}
              />
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Controller
            name={`textTargets.${index}.explanationSource`}
            control={control}
            render={({ field }) => (
              <Input
                label="Explanation source"
                placeholder="Type here"
                {...field}
              />
            )}
          />
          <Controller
            name={`textTargets.${index}.explanationTarget`}
            control={control}
            render={({ field }) => (
              <Input
                label="Explanation target"
                placeholder="Type here"
                {...field}
              />
            )}
          />
        </div>
        <Controller
          name={`textTargets.${index}.grammar`}
          control={control}
          render={({ field }) => (
            <Input label="Grammar" placeholder="Type here" {...field} />
          )}
        />
        {!!subjects.length && (
          <Controller
            name={`textTargets.${index}.textTargetSubjects`}
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              // Transform the field value to match MultiSelect expected format
              const selectedValues = field.value?.map((item: { subject?: { id: string; name: string } }) => ({
                value: item.subject?.id || '',
                label: item.subject?.name || ''
              })) || []

              return (
                <MultiSelect
                  error={
                    checkErrors ?
                      (errors.textTargets![index]?.textTargetSubjects as FieldError)
                    : null
                  }
                  isMark={true}
                  label="Subject"
                  options={subjects}
                  value={selectedValues}
                  onChange={(selectedOptions) => { 
                    const transformedValue = selectedOptions?.map((option: TOption) => ({
                      subject: {
                        id: option.value,
                        name: option.label,
                        order: 0
                      }
                    })) || []
                    field.onChange(transformedValue)
                  }}
                />
              )
            }}
          />
        )}

        <div className="mt-4 rounded-md border border-gray-200 p-2">
          {fields.map((field, idx) => (
            <fieldset key={field.id}>
              <div
                className={cn(
                  idx !== 0 && 'mt-4',
                  'flex items-center justify-between'
                )}
              >
                <div className="text-sm">Example {idx + 1}</div>
                <IconX
                  onClick={() => remove(idx)}
                  className="btn btn-square btn-xs btn-outline border-white bg-primary-foreground"
                />
              </div>
              <ExamplesForm control={control} idx={idx} idxTextTarget={index} />
            </fieldset>
          ))}
          <Button
            type="button"
            classNames={cn(fields.length !== 0 && 'mt-2', 'w-full')}
            onClick={() => {
              append({
                source: '',
                target: ''
              })
            }}
            title="Example"
            leftIcon={<IconPlus className="mr-1" />}
          />
        </div>
      </>
    )
  }
)
