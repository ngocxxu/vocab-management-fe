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
import { wordTypeList } from '../../../constants'
import { ExamplesForm } from '../examples'

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
      name: `textTarget.${index}.examples`
    })
    const checkErrors = Object.keys(errors).length > 0

    return (
      <>
        <div className="flex items-center justify-center gap-2">
          <Controller
            name={`textTarget.${index}.text`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                error={checkErrors ? errors.textTarget![index]?.text : null}
                isMark={true}
                label="Text target"
                placeholder="Type here"
                {...field}
              />
            )}
          />
          <Controller
            name={`textTarget.${index}.wordType`}
            control={control}
            render={({ field }) => (
              <Select
                label="Word type"
                options={[
                  { value: '', label: 'Select word type' },
                  ...wordTypeList
                ]}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Controller
            name={`textTarget.${index}.explanationSource`}
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
            name={`textTarget.${index}.explanationTarget`}
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
          name={`textTarget.${index}.grammar`}
          control={control}
          render={({ field }) => (
            <Input label="Grammar" placeholder="Type here" {...field} />
          )}
        />
        {!!subjects.length && (
          <Controller
            name={`textTarget.${index}.subject`}
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <MultiSelect
                error={
                  checkErrors ?
                    (errors.textTarget![index]?.subject as FieldError)
                  : null
                }
                isMark={true}
                label="Subject"
                options={subjects}
                {...field}
              />
            )}
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
