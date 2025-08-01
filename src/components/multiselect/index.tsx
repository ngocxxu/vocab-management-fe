import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import ReactSelect from 'react-select'
import { TOption } from '../../utils/types'

import { ActionMeta, MultiValue } from 'react-select'

type TMultiSelect = {
  isMark?: boolean
  label?: string
  options: TOption[]
  error?: FieldError | null
  value?: TOption[]
  onChange?: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void
}

const MultiSelect = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, options, isMark, error, ...props }: TMultiSelect, _ref) => {
    return (
      <div className="w-full">
        <div className={cn('text-sm', label && 'mt-4')}>
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </div>
        <ReactSelect
          classNames={{
            control: () => '!rounded-lg text-sm',
            option: () => '!text-sm',
            multiValue: () => '!bg-primary text-primary-foreground !rounded',
            multiValueLabel: () => '!text-primary-foreground'
          }}
          isMulti
          name="colors"
          options={options}
          {...props}
        />

        {/* Validation */}
        {error && <span className="text-xs text-red-600">{error.message}</span>}
      </div>
    )
  }
)

export default MultiSelect
