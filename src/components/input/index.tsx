import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import { InputLib, InputProps } from '../ui/input'

type TInput = {
  isMark?: boolean
  label?: ReactNode
  placeholder?: string
  error?: FieldError | null
  removeStyle?: boolean
  type?: string
}

const Input = ({
  removeStyle = false,
  label,
  isMark = false,
  placeholder,
  error,
  type = 'text',
  ...props
}: TInput & InputProps) => {
  return (
    <label className="form-control w-full">
      <div className={cn('mb-1 text-sm', !removeStyle && 'mt-4')}>
        {isMark && <span className="text-red-600">*</span>}
        {label}
      </div>
      <InputLib
        type={type}
        placeholder={placeholder}
        className="input input-bordered input-sm w-full"
        {...props}
      />

      {/* Validation */}
      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </label>
  )
}
export default Input
