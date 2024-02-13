import { FieldError } from 'react-hook-form';
import { InputLib } from '../ui/input';
import clsx from 'clsx';
import { ReactNode } from 'react';

type TInput = {
  isMark?: boolean;
  label?: ReactNode;
  placeholder: string;
  error?: FieldError | null;
  removeStyle?: boolean;
};

const Input = ({
  removeStyle = false,
  label,
  isMark = false,
  placeholder,
  error,
  ...props
}: TInput) => {
  return (
    <label className='form-control w-full'>
      <div className={clsx('text-sm', !removeStyle && 'mt-4')}>
        {isMark && <span className='text-red-600'>*</span>}
        {label}
      </div>
      <InputLib
        type='text'
        placeholder={placeholder}
        className='input input-bordered input-sm w-full'
        {...props}
      />

      {/* Validation */}
      {error && <span className='text-xs text-red-600'>{error.message}</span>}
    </label>
  );
};
export default Input;
