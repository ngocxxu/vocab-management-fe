import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import { InputLib } from '../ui/input'

type TInput = {
  isMark?: boolean
  label?: ReactNode
  placeholder?: string
  error?: FieldError | null
  removeStyle?: boolean
  type?: string
  step?: number
  className?: string
}

const Input = ({
  removeStyle = false,
  label,
  isMark = false,
  placeholder,
  error,
  type = 'text',
  className,
  ...props
}: TInput & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="form-control w-full">
      <div className={cn('mb-1 text-sm', !removeStyle && 'mt-4')}>
        {isMark && <span className="text-red-600">*</span>}
        {label}
      </div>
      <InputLib
        type={type}
        placeholder={placeholder}
        className={cn('input input-bordered input-sm w-full', className)}
        {...props}
      />

      {/* Validation */}
      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </label>
  )
}
export default Input
