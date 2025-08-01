import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'
import ReactSelect from 'react-select'
import { TOption } from '../../utils/types'

export type TSelect = {
  isMark?: boolean
  label?: string
  options: TOption[]
  error?: FieldError | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void
  value: string
  isSearchable?: boolean
}
const Select = ({
  label,
  isMark = false,
  options,
  error,
  onChange,
  value,
  isSearchable = true,
  ...props
}: TSelect) => {
  return (
    <label className="form-control w-full">
      <div className={cn('text-sm', label && 'mt-4')}>
        {isMark && <span className="text-red-600">*</span>}
        {label}
      </div>
      <ReactSelect
        isSearchable={isSearchable}
        classNames={{
          control: () => '!rounded-lg text-sm',
          option: () => '!text-sm'
        }}
        value={options.find((item) => item.value === value) || null}
        options={options}
        onChange={(e) => {
          onChange(e ? e.value : '')
        }}
        {...props}
      />

      {/* Validation */}
      {error && <span className="text-sm text-red-600">{error.message}</span>}
    </label>
  )
}

export default Select
